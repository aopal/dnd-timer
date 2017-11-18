var intervals = {};

function addTimer(uuid = null) {
  uuid = uuid || uuidv4();

  parent = document.createElement("div");
  parent.innerHTML =
  `<input type="text" class="title" />
  <span onclick="deleteTimer('${uuid}')" class="delete">&times</span>
  <div id="timer${uuid}">0d 0h 0m 0s</div>
  <input class="time" type="text" id="hour${uuid}"/>
  <input class="time" type="text" id="minute${uuid}"/>
  <input class="time" type="text" id="second${uuid}"/>
  <button onclick="startTimer('${uuid}')">Start</button>
  <button onclick="stopTimer('${uuid}')">Stop</button>
  <button class="addLabel" onclick="addLabel('${uuid}')">Add label</button>
  <input type="text" class="label" />
  <input type="text" class="label" />
  <input type="text" class="label" />`;
  parent.className = "timerContainer";
  parent.id = `timerContainer${uuid}`;

  document.body.appendChild(parent);
}

function deleteTimer(uuid) {
  elem = document.getElementById('timerContainer' + uuid);
  elem.parentNode.removeChild(elem);
  deleteCookie('timer' + uuid)
}

function startTimer(uuid) {
  stopTimer(uuid);

  var hours = parseInt(document.getElementById('hour' + uuid).value);
  var minutes = parseInt(document.getElementById('minute' + uuid).value);
  var seconds = parseInt(document.getElementById('second' + uuid).value);

  hours = (hours) ? hours : 0;
  minutes = (minutes) ? minutes : 0;
  seconds = (seconds) ? seconds : 0;

  var d = new Date();
  var countDownDate = d.getTime() + 1000*(seconds + minutes*60 + hours*60*60);

  setCookie("timer" + uuid, countDownDate, 1000000);

  addInterval(uuid);
}

function stopTimer(uuid) {
  clearInterval(intervals[uuid]);
  var timer = document.getElementById("timer" + uuid);
  timer.className = "";
}

function addInterval(uuid) {
  // Update the count down every 1 second
  intervals[uuid] = setInterval(function() {
    document.getElementById("timer" + uuid).style = "color: black";

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = parseInt(getCookie("timer" + uuid)) - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));    
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("timer" + uuid).innerHTML = days + "d " + hours + "h " +
      minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      stopTimer(uuid);
      var timer = document.getElementById("timer" + uuid);
      timer.innerHTML = "EXPIRED";
      timer.style = "color: red; font-weight: bold";
      timer.className = "blink";
    }
  }, 100);
}

function addLabel(uuid) {
  label = document.createElement("input");
  label.type = "text";
  label.className = 'label';
  document.getElementById('timerContainer' + uuid).appendChild(label);
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

function deleteCookie (cname) {
  document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function loadTimersFromCookies(){
  if(!document.cookie)
    return;

  document.cookie.match(/timer[0-9a-f\-]+=[0-9]+/g).map(function(val){
    match_arr = val.match(/timer([0-9a-f\-]+)=([0-9]+)/)
    uuid = match_arr[1];
    addTimer(uuid);
    addInterval(uuid);
  });
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}