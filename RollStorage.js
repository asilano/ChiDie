import AsyncStorage from "@react-native-async-storage/async-storage";

// async function readCounts(dieSize, zeroedFaceCounts) {
//   try {
//     const stored = await AsyncStorage.getItem(dieSize);
//     if (stored !== null) {
//       return JSON.parse(stored);
//     } else {
//       return zeroedFaceCounts;
//     }
//   } catch (e) {
//     return zeroedFaceCounts;
//   }
// }

// async function storeCounts(dieSize, faceCounts) {
//   try {
//     const jsonValue = JSON.stringify(faceCounts);
//     await AsyncStorage.setItem(dieSize, jsonValue);
//   } catch (e) {
//     // saving error
//   }
// }

async function readCounts(dieSize, faceCounts) {
  try {
    const stored = await AsyncStorage.getItem(dieSize);

    if (stored !== null) {
      JSON.parse(stored).forEach((count, ix) => {
        faceCounts[ix][1](count);
      })
    } else {
      faceCounts.forEach((pair) => pair[1](0))
    }
  } catch (e) {
    faceCounts.forEach((pair) => pair[1](0))
  }
}

async function storeCounts(dieSize, faceCounts) {
  try {
    const jsonValue = JSON.stringify(faceCounts.map(pair => pair[0]));
    await AsyncStorage.setItem(dieSize, jsonValue);
  } catch (e) {
    // saving error
  }
}

export { readCounts, storeCounts }
