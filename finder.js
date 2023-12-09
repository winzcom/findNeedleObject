function findNeedle(haystack, needle) {
  let val = false;
  let tcount = 0;
  const nlen = Object.keys(needle).length;
  if (nlen == 0) {
    return false;
  }
  for (let i in haystack) {
    const htype = typeof haystack[i];
    const ntype = typeof needle[i];
    if (haystack[i] == needle[i]) {
      tcount += 1;
      continue;
    } else if (htype != "object") {
      continue;
    } else {
      if (typeof needle == "object" && i in needle) {
        if (findNeedle(haystack[i], needle[i])) {
          tcount += 1;
          continue;
        }
      } else {
        if (findNeedle(haystack[i], needle)) {
          return true;
        }
      }
    }
  }
  return tcount == nlen;
}
