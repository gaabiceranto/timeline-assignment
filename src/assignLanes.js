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

export function assignLanesFixed(items) {
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
