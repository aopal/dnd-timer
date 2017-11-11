var count = 0;
var intervals = [];

function addTimer() {
  parent = document.createElement("div");
  parent.innerHTML =
  `<input type="text" class="label" /><div id="timer${count}">0h 0m 0s</div><input class="time" type="text" id="hour${count}"/><input class="time" type="text" id="minute${count}"/><input class="time" type="text" id="second${count}"/><button onclick="startTimer(${count})">Start</button><button onclick="stopTimer(${count})">Stop</button>
  <button class="addLabel" onclick="addLabel(${count})">Add label</button><input type="text" class="label" /><input type="text" class="label" /><input type="text" class="label" />`;
  parent.className = "timerContainer";
  parent.id = `timerContainer${count}`;

  document.body.appendChild(parent);

  count++;
}

function startTimer(i) {
  stopTimer(i);
  // Set the date we're counting down to
  var hours = parseInt(document.getElementById('hour' + i).value);
  var minutes = parseInt(document.getElementById('minute' + i).value);
  var seconds = parseInt(document.getElementById('second' + i).value);

  hours = (hours) ? hours : 0;
  minutes = (minutes) ? minutes : 0;
  seconds = (seconds) ? seconds : 0;

  var d = new Date();
  var countDownDate = d.getTime() + 1000*(seconds + minutes*60 + hours*60*60);

  // Update the count down every 1 second
  intervals[i] = setInterval(function() {
    document.getElementById("timer" + i).style = "color: black";

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("timer" + i).innerHTML = hours + "h " +
      minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      stopTimer(i);
      var timer = document.getElementById("timer" + i);
      timer.innerHTML = "EXPIRED";
      timer.style = "color: red; font-weight: bold";
      timer.className = "blink";
    }
  }, 100);
}

function stopTimer(i) {
  clearInterval(intervals[i]);
  var timer = document.getElementById("timer" + i);
  timer.className = "";
}

function addLabel(i) {
  label = document.createElement("input");
  label.type = "text";
  label.className = 'label';
  document.getElementById('timerContainer' + i).appendChild(label);
}
