$(document).ready(function () {
  function tweetButtonClick() {
    let selectedText = document.getSelection().toString();
    window.open(
      "https://twitter.com/intent/tweet?url=https://the-ken.com/&text=" +
        selectedText +
        "&via=TheKenWeb"
    );
  }

  function linkedInButtonClick() {
    let selectedText = document.getSelection().toString();
    window.open(
      "https://www.linkedin.com/sharing/share-offsite/?url=https://the-ken.com/"
    );
  }

  function fbButtonClick() {
    let selectedText = document.getSelection().toString();
    window.open(
      "https://www.facebook.com/sharer.php?u=https://the-ken.com/&quote=" +
        selectedText
    );
  }

  function whatsAppButtonClick() {
    let selectedText = document.getSelection().toString();
    window.open(
      "https://api.whatsapp.com/send?text=" +
        selectedText +
        "https://the-ken.com/"
    );
  }

  const textSelectionTooltipContainer = document.createElement("div");
  textSelectionTooltipContainer.setAttribute(
    "id",
    "textSelectionTooltipContainer"
  );
  textSelectionTooltipContainer.innerHTML = `<button id="textShareTwitterBtn">Tw</button><button id="textShareLinkedInBtn">In</button><button id="textShareFacebookBtn">Fb</button><button id="textShareWhatsAppBtn">Wa</button>`;
  const bodyElement = document.getElementsByTagName("BODY")[0];

  $("body").on("click", "#textShareTwitterBtn", tweetButtonClick);
  //$("body").on("click", "#textShareLinkedInBtn", linkedInButtonClick);
  $("body").on("click", "#textShareFacebookBtn", fbButtonClick);
  $("body").on("click", "#textShareWhatsAppBtn", whatsAppButtonClick);

  document.onselectionchange = function (e) {
    var textu = document.getSelection().toString();
    if (!textu.length) {
      textSelectionTooltipContainer.remove();
    }
  };

  function showTextSelectionTooltip(e) {
    let textu = document.getSelection().toString();
    let matchu = /\r|\n/.exec(textu);
    if (textu.length && !matchu) {
      let range = document.getSelection().getRangeAt(0);
      rect = range.getBoundingClientRect();
      scrollPosition = $(window).scrollTop();
      textSelectionTooltipContainer.innerHTML = `<div><button id="textShareTwitterBtn"></button><button id="textShareFacebookBtn"></button><button id="textShareWhatsAppBtn"></button></div><span class="pointer"></span>`;
      containerLeft = rect.left + rect.width / 2 - 65;
      bodyElement.appendChild(textSelectionTooltipContainer);
      let pointer = document.querySelector(
        "#textSelectionTooltipContainer .pointer"
      );
      let containerRight = containerLeft + 130;
      if (containerLeft < 0) {
        pointer.style.left = 55 + containerLeft + "px";
        containerLeft = 0;
      } else if (containerRight > window.innerWidth) {
        containerLeft = containerLeft - (containerRight - window.innerWidth);
        pointer.style.left = 55 + (containerRight - window.innerWidth) + "px";
      } else {
        pointer.style.left = 55 + "px";
      }
      containerLeft = containerLeft + "px";
      containerTop = scrollPosition + rect.top - 50;
      if (containerTop < window.scrollPosition) {
        containerTop = scrollPosition + rect.bottom + 10;
        pointer.style.borderWidth = "0 10px 10px";
        pointer.style.borderColor = "transparent transparent #ebebeb";
        pointer.style.top = "-10px";
      } else {
        pointer.style.borderWidth = "10px 10px 0";
        pointer.style.borderColor = "#ebebeb transparent transparent";
        pointer.style.top = "unset";
      }
      containerTop = containerTop + "px";
      textSelectionTooltipContainer.style.transform =
        "translate3d(" + containerLeft + "," + containerTop + "," + "0px)";
    }
  }

  [document.querySelector("#textToSelect")].forEach((item) => {
    item.addEventListener("mouseup", (e) => showTextSelectionTooltip(e));
  });
});
