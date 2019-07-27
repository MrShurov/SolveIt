import Draggabilly from "draggabilly";
import NumberUtils from "./../utils/numberUtils.js";
import ArrayUtils from "./../utils/arrayUtils.js";

export default class GameController {
  init(content, model) {
    this.content = content;
    this.model = model;
  }

  makeProperFractionDraggable(properFractionDOM, properFraction) {
    const self = this,
      dragabillySetting = { grid: [1, 1] },
      pfDraggable = new Draggabilly(properFractionDOM, dragabillySetting);
    pfDraggable.on("dragEnd", function(event, pointer) {
      self.isPFinAnswerBlock(pointer, this);
    });
    return pfDraggable;
  }

  isPFinAnswerBlock(pointer, pfDraggable) {
    const self = this,
      inputBlockRect = $(".answerBlock")[0].getBoundingClientRect();
    if (
      pointer.pageX >= inputBlockRect.left + pageXOffset &&
      pointer.pageX <= inputBlockRect.right + pageXOffset &&
      (pointer.pageY >= inputBlockRect.top + pageYOffset &&
        pointer.pageY <= inputBlockRect.bottom + pageYOffset)
    ) {
      self.model.setPFinBlock(pfDraggable);
      self.findSum();
      return true;
    } else if (
      pointer.pageX >= inputBlockRect.right + pageXOffset ||
      pointer.pageX <= inputBlockRect.left + pageXOffset
    ) {
      $(pfDraggable.$element).remove();
      self.findSum();
    } else {
      try {
        self.model.setPFinBlock(pfDraggable);
      } catch (e) {
        $(pfDraggable.$element).remove();
        return false;
      }
      $(pfDraggable.$element).remove();
      return false;
    }
  }

  findSum() {
    let pfAnswer = $(".answerBlock div"),
      properFractions = [],
      commonDenominator,
      numeratorsSum = 0,
      integersSum = 0,
      denominatorMultiples = [],
      result = {};

    if (!pfAnswer.length) {
      return false;
    }

    for (let i = 0; i < pfAnswer.length; i++) {
      properFractions.push({
        integer: +pfAnswer[i].getAttribute("data-integer"),
        numerator: +pfAnswer[i].getAttribute("data-numerator"),
        denominator: +pfAnswer[i].getAttribute("data-denominator")
      });
    }

    if (properFractions.length === 1) {
      result.integer = properFractions[0].integer;
      result.numerator = properFractions[0].numerator;
      result.denominator = properFractions[0].denominator;
    } else {
      properFractions.forEach(pf => {
        denominatorMultiples.push(
          ArrayUtils.arrayToMap(NumberUtils.findMultiples(pf.denominator))
        );
      });

      commonDenominator = NumberUtils.findLowestCommonDenominator(
        denominatorMultiples
      );

      properFractions.forEach(pf => {
        pf.numerator *= commonDenominator / pf.denominator;
        pf.denominator = commonDenominator;
        numeratorsSum += pf.numerator;
        integersSum += pf.integer;
      });

      result.denominator = commonDenominator;

      if (numeratorsSum > commonDenominator) {
        result.integer = Math.floor(numeratorsSum / commonDenominator);
        result.integer = numeratorsSum - result.integer * commonDenominator;
        result.integer += integersSum;
      } else {
        result.integer = integersSum;
        result.numerator = numeratorsSum;
      }
    }

    console.log(
      result.integer + " / " + result.numerator + " " + result.denominator
    );

    return result;
  }
}
