let buttons = document.querySelectorAll(".option-button");
let advancedButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontNames");
let fontSize = document.getElementById("fontSizes");
let linkButton = document.getElementById("createLink");
let unlinkButton = document.getElementById("unlink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let workSpace = document.getElementById("textInput");

// fontlist

let fontList = [
  "Arial",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Lucida Sans",
  "Comic Sans MS",
];

const initializer = () => {
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSize.appendChild(option);
  }

  fontSize.value = 3;
};

const modifyText = (command, defaultUi, value) => {
  let success = document.execCommand(command, defaultUi, value);

  if (!success) {
    console.error(`execCommand(${command}, ${defaultUi}, ${value}) failed`);
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

advancedButton.forEach((button) => {
  if (button.tagName === "SELECT" || button.type === "color") {
    button.addEventListener("change", () => {
      modifyText(button.id, false, button.value);
    });
  } else {
    button.addEventListener("click", () => {
      modifyText(button.id, false, button.value);
    });
  }
});

linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

const highlighter = (className, toBeRemoved) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (toBeRemoved) {
        let alreadyActive = false;

        if (button.classList.contains("active")) {
          alreadyActive = true;
        }
        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

// Call initializer function
initializer();
