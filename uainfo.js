function getUA() {
  var navAgent = {OS: {name: null, version: null}, browser: {name: null, version: null}};
  var agent = navigator.userAgent;
  console.log(agent);
  var subs = Array();
  var inpar = false;
  var lastpos = 0;
  var amount = 0;
  var excess = 0;
  for (var i = 0; i <= agent.length; i++) {
    var char = agent.charAt(i);
    if (char == "(") {
      inpar = true;
      lastpos++;
      excess++;
    }else if (char == ")") {
      inpar = false;
      excess++;
    }
    if (!inpar) {
      if (char == " " ) {
        subs.push(agent.substr(lastpos, amount - excess));
        amount = 0;
        lastpos = i+1;
        excess = 1;
      }
    }
    if (i == agent.length) {
      subs.push(agent.substr(lastpos, amount-1));
    }
    amount++;
  }
  for (var i = 0; i < subs.length; i++) {
    var feature = subs[i].split(/[/;,()]+\s*/g);
    if (feature[0].match("Windows NT") || feature[0].match("compatible")){
      for (var j = 0; j < feature.length; j++) {
        var str = feature[j];
        if (str.match("MSIE")) {
          navAgent.browser.name = "Internet Explorer";
          navAgent.browser.version = str.split("MSIE ")[1];
          continue;
        }
        if (str.match("Trident")) {
          navAgent.browser.name = "Internet Explorer";
          continue;
        }
        if (str.match("rv:")) {
          navAgent.browser.version = str.split("rv:")[1];
          continue;
        }
        if (str.match("Windows NT")) {
          navAgent.OS.name = "Windows";
          navAgent.OS.version = str.split("Windows NT ")[1];
          continue;
        }
        if (str == "") {
          feature.pop();
        }
      }
    }
    subs[i] = feature;
    switch (feature[0]) {
      case "Macintosh":
      case "Linux":
      case "iPad":
      case "iPhone": navAgent.OS = {name: feature[0], version: feature[1]};
      break;
      case "Firefox":
      case "Edge":
      case "Chrome":
      case "CriOS":
      case "FxiOS":
      case "Firefox": navAgent.browser = {name: feature[0], version: feature[1]};
      break;
      case "Version": navAgent.browser = {name: "Safari", version: feature[1]};
      break;
      case "OPR": navAgent.browser = {name: "Opera", version: feature[1]};
      break;
      default: navAgent[feature[0]] = feature[1];
    }
  }
  console.log(subs);
  if (!navAgent.browser.name) {
    navAgent.browser.name = "Unknown";
  }
  if (!navAgent.browser.version) {
    navAgent.browser.version = "unsupported";
  }
  if (!navAgent.OS.name) {
    navAgent.OS = {name: "Unknown", version: "unknown"};
  }
  return navAgent;
}
