export default class GameView {
  init(content, model) {
    this.content = content;
    this.model = model;
  }

  drawProperFraction(properFraction) {
    let canvas, pfDOM;
    if (properFraction.copy) {
      if (properFraction.nextSibling.length) {
        $(properFraction.nextSibling).before("<div class=properFraction>");
      } else {
        $(properFraction.prevSibling).after("<div class=properFraction>");
      }
      $(".properFraction:not(:has(canvas))").append("<canvas></canvas>");
      canvas = $("canvas:not(.drawn)")[0];
    } else {
      $(".properFractionsBlock").append("<div class=properFraction>");
      $(".properFraction:last-child").append("<canvas></canvas>");
      canvas = $("canvas")[$("canvas").length - 1];
    }

    pfDOM = $(canvas).parent()[0];
    pfDOM.setAttribute("data-integer", properFraction.integer);
    pfDOM.setAttribute("data-numerator", properFraction.numerator);
    pfDOM.setAttribute("data-denominator", properFraction.denominator);

    const context = canvas.getContext("2d"),
      beginAngle = Math.PI * 1.5,
      angle360 = Math.PI * 2;

    canvas.setAttribute("width", "100px");
    canvas.setAttribute("height", "100px");

    context.beginPath();
    context.fillStyle = "rgb(255, 237, 115)";

    if (properFraction.integer === 1) {
      context.arc(50, 50, 30, beginAngle, beginAngle + angle360);
    }

    context.arc(
      50,
      50,
      30,
      beginAngle,
      beginAngle +
        (angle360 / properFraction.denominator) * properFraction.numerator
    );
    context.lineTo(50, 50);
    context.fill();

    context.strokeStyle = "rgb(255, 237, 115)";
    context.arc(50, 50, 30, beginAngle, beginAngle + angle360);
    context.stroke();
    context.closePath();

    $(canvas).addClass("drawn");

    this.model.setPfinPfList(pfDOM);

    return pfDOM;
  }

  generateProperFractions(complexFraction, typeOfGame) {
    const cf = Object.assign({}, complexFraction),
      properFractions = [
        {
          integer: 1,
          numerator: 0,
          denominator: cf.denominator
        },
        {
          integer: 0,
          numerator: 1,
          denominator: cf.denominator
        }
      ];

    switch (typeOfGame) {
      case "double it":
        if (cf.denominator % 2 === 0 && cf.numerator > 0) {
          properFractions.push({
            integer: 0,
            numerator: 1,
            denominator: cf.denominator / 2
          });
        } else if (cf.numerator === 0) {
          properFractions.pop();
          properFractions.push({
            integer: 0,
            numerator: 1,
            denominator: 2
          });
          properFractions.push({
            integer: 0,
            numerator: 1,
            denominator: 3
          });
        } else {
          properFractions.push({
            integer: 0,
            numerator: 1,
            denominator: cf.denominator - 1
          });
        }
        break;
      case "tripple it":
        if (cf.denominator % 2 === 0 && cf.numerator > 0) {
          if (cf.denominator / 3) {
            properFractions.push({
              integer: 0,
              numerator: 1,
              denominator: cf.denominator / 3
            });
          } else {
            properFractions.push({
              integer: 0,
              numerator: 1,
              denominator: cf.denominator / 2
            });
          }
        } else if (cf.numerator === 0) {
          properFractions.pop();
          properFractions.push({
            integer: 0,
            numerator: 1,
            denominator: 2
          });
          properFractions.push({
            integer: 0,
            numerator: 1,
            denominator: 3
          });
        } else {
          properFractions.push({
            integer: 0,
            numerator: 1,
            denominator: cf.denominator - 1
          });
        }
        break;
      case "find one-half":
        if (cf.denominator % 2 === 0 && cf.numerator > 0) {
          properFractions.push({
            integer: 0,
            numerator: 1,
            denominator: cf.denominator * 2
          });
        } else if (cf.numerator === 0) {
          properFractions.pop();
          properFractions.push({
            integer: 0,
            numerator: 1,
            denominator: 2
          });
          properFractions.push({
            integer: 0,
            numerator: 1,
            denominator: 3
          });
        } else {
          properFractions.push({
            integer: 0,
            numerator: 1,
            denominator: cf.denominator - 1
          });
        }
        break;
      case "find one-third":
        if ((cf.denominator * cf.numerator + 1) % 3) {
          properFractions.pop();
          properFractions.push({
            integer: 0,
            numerator: 1,
            denominator: 2
          });
          properFractions.push({
            integer: 0,
            numerator: 1,
            denominator: 3
          });
        } else {
          properFractions.push({
            integer: 0,
            numerator: 1,
            denominator: cf.denominator * 3
          });
        }
        break;
      default:
        return false;
    }

    return properFractions;
  }

  positionPFinBlock() {
    let inputBlockRect = $(".answerBlock")[0].getBoundingClientRect(),
      pfDraggable = this.model.getIsPFinBlock();
    if (pfDraggable !== null) {
      $(".answerBlock").append(pfDraggable.element);
      pfDraggable.element.style.left = inputBlockRect.left + pageXOffset;
      pfDraggable.element.style.top = "0px";
      this.model.setPFinBlock(null);
      return true;
    }
  }

  makeDraggableCopyPF(pfDraggable) {
    var pfDOM = pfDraggable.$element[0];
    const pfCopy = {
      integer: +pfDOM.getAttribute("data-integer"),
      numerator: +pfDOM.getAttribute("data-numerator"),
      denominator: +pfDOM.getAttribute("data-denominator"),
      copy: true,
      nextSibling: $(pfDOM).next(),
      prevSibling: $(pfDOM).prev()
    };
    this.drawProperFraction(pfCopy);
  }
}
