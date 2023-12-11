function findNeedle(haystack, needle) {
  let val = false;
  let tcount = 0;
  const nlen = Object.keys(needle).length;
  const hlen = Object.keys(haystack).length;
  if (nlen == 0 && hlen) {
    return true;
  }
  for (let i in haystack) {
    const htype = typeof haystack[i];
    const ntype = typeof needle[i];
    if (haystack[i] == needle[i]) {
      tcount += 1;
      continue;
    } else if (htype != "object") {
      if (nlen == hlen) {
        return false;
      }
      if (i in needle) {
        return false;
      }
      continue;
    } else if (
      i in needle &&
      Array.isArray(needle[i]) &&
      Array.isArray(haystack[i])
    ) {
      // compare the arrays

      if (haystack[i].length != needle[i].length) {
        continue;
      } else {
        // loop through array and compare values
        if (needle[i].length == 0) {
          tcount += 1;
          continue;
        }
        let present = true;
        for (let k = 0; k < needle[i].length; k += 1) {
          const ntypek = typeof needle[i][k];
          const htypek = typeof haystack[i][k];
          if (ntypek != htypek) {
            break;
          }
          if (ntypek == "object") {
            present = findNeedle(haystack[i][k], needle[i][k]) && present;
          }
          else if (haystack[i].includes(needle[i][k])) {
            present = true;
          } else {
            present = false;
            break;
          }
          // console.log({
          //   jk: haystack[i][k],
          //   nk: needle[i][k],
          //   hasy: haystack[i],
          //   need: needle[i],
          //   present,
          // });
        }
        if (present) {
          tcount += 1;
        }
        continue;
      }
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
