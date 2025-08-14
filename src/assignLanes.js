export function assignLanes(items) {
  if (!items.length) return [];

  const sortedItems = items
    .map((item, index) => ({
      ...item,
      originalIndex: index,
      startDate: new Date(item.start),
      endDate: new Date(item.end),
    }))
    .sort((a, b) => {
      const aStart = a.startDate.getTime();
      const bStart = b.startDate.getTime();
      if (aStart === bStart) {
        return a.originalIndex - b.originalIndex;
      }
      return aStart - bStart;
    });

  const lanes = [];
  const laneEnds = [];

  for (const item of sortedItems) {
    let assignedLane = -1;

    for (let i = 0; i < laneEnds.length; i++) {
      if (laneEnds[i] <= item.startDate) {
        assignedLane = i;
        break;
      }
    }

    if (assignedLane === -1) {
      assignedLane = lanes.length;
      lanes.push([]);
      laneEnds.push(item.endDate);
    } else {
      laneEnds[assignedLane] = item.endDate;
    }

    lanes[assignedLane].push(item);
  }

  return lanes;
}

export function assignLanesOptimized(items) {
  if (!items.length) return [];

  const sortedItems = items
    .map((item, index) => ({
      ...item,
      originalIndex: index,
      startDate: new Date(item.start),
      endDate: new Date(item.end),
    }))
    .sort((a, b) => {
      const aStart = a.startDate.getTime();
      const bStart = b.startDate.getTime();
      if (aStart === bStart) {
        return a.originalIndex - b.originalIndex;
      }
      return aStart - bStart;
    });

  const lanes = [];
  const laneEnds = [];

  for (const item of sortedItems) {
    let bestLane = -1;
    let minGap = Infinity;

    for (let i = 0; i < laneEnds.length; i++) {
      if (laneEnds[i] <= item.startDate) {
        const gap = item.startDate - laneEnds[i];
        if (gap < minGap) {
          minGap = gap;
          bestLane = i;
        }
      }
    }

    if (bestLane === -1) {
      bestLane = lanes.length;
      lanes.push([]);
      laneEnds.push(item.endDate);
    } else {
      laneEnds[bestLane] = item.endDate;
    }

    lanes[bestLane].push(item);
  }

  return lanes;
}

export function assignLanesByOriginalOrder(items) {
  if (!items.length) return [];

  const lanes = [];
  const laneEnds = [];

  for (const item of items) {
    const startDate = new Date(item.start);
    const endDate = new Date(item.end);

    let assignedLane = -1;

    for (let i = 0; i < laneEnds.length; i++) {
      if (laneEnds[i] <= startDate) {
        assignedLane = i;
        break;
      }
    }

    if (assignedLane === -1) {
      assignedLane = lanes.length;
      lanes.push([]);
      laneEnds.push(endDate);
    } else {
      laneEnds[assignedLane] = endDate;
    }

    lanes[assignedLane].push(item);
  }

  return lanes;
}
