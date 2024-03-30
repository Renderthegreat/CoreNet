import HTTP from "../HTTP.js";
import { Document, Element } from "../HTML.js";
export default {
	GET: {
		"*": async (req, res) => {
			return new HTTP("404 Page Not Found", "text/plain", 404, "NOT FOUND");
		},
		"/": {
			use: (path) => {
				let subPath = path.split("/")[1];

				switch (subPath) {
					case "time": {
						return "time";
					}
					case "timer": {
						return "timer";
					}
					default: {
						return "~";
					}
				}
			},
			time: (req, res) => {
				return new HTTP(new Date(), "text/plain", 200, "OK");
			},
			timer: (req, res) => {
				function make(element, text, mode) {
					if (mode === "attribute") {
						element.setAttribute(text[0], text[1]);
					}
					if (mode === "text") {
						element.textContent = text;
					}
					return element;
				}
				let window = {};
				let document = new Document();
				let Div = new Element("div");
				Div.setAttribute("id", "timer");
				let elements = {
					div: [
						make(new Element("h1"), "timer", "text"),
						make(new Element("h3"), "Set a timer.", "text"),
						make(
							new Element("script"),
							function onload() {
								// Create timer container
								const timerContainer = document.createElement("div");
								timerContainer.setAttribute("class", "timer-container");

								// Create h1 element for heading
								const heading = document.createElement("h1");
								heading.textContent = "Circular Timer";

								// Create timer div for SVG and text
								const timerDiv = document.createElement("div");
								timerDiv.setAttribute("class", "timer");

								// Create SVG element for circle
								const circle = document.createElementNS(
									"http://www.w3.org/2000/svg",
									"circle",
								);
								circle.setAttribute("class", "circle");
								const radius = 90;
								const circumference = 2 * Math.PI * radius;
								circle.setAttribute("cx", "100");
								circle.setAttribute("cy", "100");
								circle.setAttribute("r", "90");
								circle.setAttribute("fill", "none");
								circle.setAttribute("stroke-width", "10");
								circle.style.strokeDasharray = `${circumference} ${circumference}`;
								circle.style.strokeDashoffset = circumference;

								// Create div for timer text
								const timerText = document.createElement("div");
								timerText.setAttribute("class", "timer-text");

								// Append circle and text to timer div
								timerDiv.appendChild(circle);
								timerDiv.appendChild(timerText);

								// Create slider container
								const sliderContainer = document.createElement("div");
								sliderContainer.setAttribute(
									"class",
									"slider-container",
								);

								// Create sliders for hours, minutes, and seconds
								const sliders = [];
								const labels = ["Hours", "Minutes", "Seconds"];
								const ids = ["hours", "minutes", "seconds"];
								for (let i = 0; i < 3; i++) {
									const label = document.createElement("label");
									label.textContent = `${labels[i]}: `;
									const input = document.createElement("input");
									input.setAttribute("type", "range");
									input.setAttribute("id", ids[i]);
									input.setAttribute("min", "0");
									input.setAttribute("max", i === 0 ? "23" : "59");
									input.setAttribute("value", "0");
									const span = document.createElement("span");
									span.setAttribute("id", `${ids[i]}-value`);
									span.textContent = "\n";
									sliderContainer.appendChild(label);
									sliderContainer.appendChild(input);
									sliderContainer.appendChild(span);
									sliders.push(input);
								}

								// Create start button
								const startBtn = document.createElement("button");
								startBtn.setAttribute("id", "start-btn");
								startBtn.textContent = "Start";

								// Create reset button
								const resetBtn = document.createElement("button");
								resetBtn.setAttribute("id", "reset-btn");
								resetBtn.textContent = "Reset";

								// Append all elements to timer container
								timerContainer.appendChild(heading);
								timerContainer.appendChild(timerDiv);
								timerContainer.appendChild(sliderContainer);
								timerContainer.appendChild(startBtn);
								timerContainer.appendChild(resetBtn);

								// Append timer container to body
								document.body.appendChild(timerContainer);

								// Initialize timer
								let intervalId;
								let totalTime;
								let timeLeft;

								function updateValue() {
									const hours = parseInt(sliders[0].value);
									const minutes = parseInt(sliders[1].value);
									const seconds = parseInt(sliders[2].value);
									totalTime = hours * 3600 + minutes * 60 + seconds;
									timeLeft = totalTime;
									updateTimerDisplay();
								}

								function updateTimerDisplay() {
									const hours = Math.floor(timeLeft / 3600);
									const minutes = Math.floor((timeLeft % 3600) / 60);
									const seconds = timeLeft % 60;
									timerText.innerHTML = `${formatTime(
										hours,
									)}:${formatTime(minutes)}:${formatTime(seconds)}`;
								}

								function startTimer() {
									intervalId = setInterval(function () {
										timeLeft--;
										updateTimerDisplay();
										updateCircle();
										if (timeLeft <= 0) {
											clearInterval(intervalId);
											alert("Timer is finished!");
										}
									}, 1000);
								}

								function updateCircle() {
									const progress =
										circumference -
										(timeLeft / totalTime) * circumference;
									circle.style.strokeDashoffset = progress;
									if (timeLeft <= totalTime / 2) {
										circle.style.stroke = "#007bff"; // Blue color for time left
									} else {
										circle.style.stroke = "#ccc"; // Grey color for remaining time
									}
								}

								function resetTimer() {
									clearInterval(intervalId);
									timeLeft = totalTime;
									updateTimerDisplay();
									updateCircle();
								}

								function formatTime(time) {
									return time < 10 ? `0${time}` : time;
								}

								sliders.forEach((slider) => {
									slider.addEventListener("input", updateValue);
								});
								startBtn.addEventListener("click", startTimer);
								resetBtn.addEventListener("click", resetTimer);
								updateValue();
							},
							"text",
						),
					].map((item) => {
						if (item.tagName == "script") {
							document.body.appendChild(item);
						} else {
							Div.appendChild(item);
							return Div;
						}
					}),
				};
				document.body.appendChild(elements.div[0]);
				document.body.setAttribute("onload", "onload()");
				let WebPage = document.body.innerHTML;
				return new HTTP(WebPage, "text/html", 200, "OK");
			},
		},
	},
	POST: {},
	PUT: {},
	PATCH: {},
	DELETE: {},
};
