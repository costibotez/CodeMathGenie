const add = something => {
  window.parent.postMessage(something,"*");
};
(function () {
  const originalError = console.error;
  const originalLog = console.log;
  const originalWarning = console.warn;
  const originalInfo = console.info;
  const originalClear = console.clear;

  console.error = function (error) {
    add({type: 'Error', data: maybeStringify(error)});
    originalError.apply(console, arguments);
  };
  console.log = function (...args) {
  	add({type: 'Log', data: maybeStringify(args[0])});
    originalLog.apply(console, args);
  };
  console.warn = function (...args) {
  	add({type: 'Warn', data: maybeStringify(args[0])});
    originalWarning.apply(console, args);
  };
  console.info = function (...args) {
  	add({type: 'Info', data: maybeStringify(args[0])});
    originalInfo.apply(console, args);
  };
  console.clear = function (...args) {
  	add({type: 'Clear', data: ""});
    originalClear.apply(console, args);
  };
  window.onerror = function(errMsg, url, line, column, error) {
    add({type:'Error', data: errMsg + "\nURL= " + url + "\nline= " + line});
    var suppressErrorAlert = true;
    return suppressErrorAlert;
  };
  window.onwarning = function(errMsg, url, line) {
    add({type:'Warn', data: errMsg + "\nURL= " + url + "\nline= " + line});
    var suppressErrorAlert = true;
    return suppressErrorAlert;
  };
})();

function maybeStringify (msg) {
  return (typeof(msg) === 'string' ? msg : JSON.stringify(msg))
}