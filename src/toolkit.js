/**
 * ToolkitBanner — rotating tool logos between TeamsSection and SpecialistsSection.
 * Pauses on the icon whose center is closest to the pointer.
 */

export function nearestItemIndex(pointerX, centers) {
  if (!centers.length) return -1;
  let best = 0;
  let bestDist = Math.abs(centers[0] - pointerX);
  for (let i = 1; i < centers.length; i += 1) {
    const dist = Math.abs(centers[i] - pointerX);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }
  return best;
}

function itemCenters(items) {
  return items.map((item) => {
    const box = item.getBoundingClientRect();
    return box.left + box.width / 2;
  });
}

function setNearest(items, index) {
  items.forEach((item, i) => {
    item.classList.toggle('is-nearest', i === index);
  });
}

function clearNearest(items) {
  items.forEach((item) => item.classList.remove('is-nearest'));
}

export function initToolkitBanner(root = document) {
  const banner = root.querySelector('[data-toolkit-banner]');
  if (!banner) return;

  const items = [...banner.querySelectorAll('.toolkit-banner__item')];
  if (!items.length) return;

  const onMove = (event) => {
    const live = items.filter((item) => item.getBoundingClientRect().width > 0);
    banner.classList.add('is-paused');
    setNearest(live, nearestItemIndex(event.clientX, itemCenters(live)));
  };

  const onLeave = () => {
    banner.classList.remove('is-paused');
    clearNearest(items);
  };

  banner.addEventListener('pointerenter', onMove);
  banner.addEventListener('pointermove', onMove);
  banner.addEventListener('pointerleave', onLeave);
}
