/*
Date Utilities
*/

export function datetimeValue() {
  try {
    // test whether a new datetime-local input falls back to a text input or not
    var test = document.createElement('input');
    test.type = 'datetime-local';
  } catch (e) {
      console.log(`e.description: ${e.description}`);
  }
  if (test.type === "text")
    return(formatUtcDate());
  else {
    // datetime-local wants local ISO time
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
    return(localISOTime.slice(0,16));
  }
}

export function formatUtcDate(utc_string) {
  if (utc_string)
    var localDate = new Date(utc_string);
  else 
    localDate = new Date();
  const secondString = localDate.toLocaleTimeString().substr(-6,6);
  return localDate.toLocaleString().replace(secondString, secondString.substr(-3));
}