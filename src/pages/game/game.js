import ProperFractionModel from "./gameModel.js";
import ProperFractionView from "./gameView.js";
import ProperFractionController from "./gameController.js";

let pfController = new ProperFractionController(),
  pfModel = new ProperFractionModel(),
  pfView = new ProperFractionView();

pfController.init($("#content"), pfModel);
pfModel.init(pfView);
pfView.init($("#content"), pfModel);

let cf = {
  integer: 2,
  numerator: 1,
  denominator: 8
};

$(".properFractionsBlock").on("DOMNodeInserted", "canvas", function(event) {
  const pfDOM = $(event.target).parent()[0];
  const properFraction = {
    integer: +pfDOM.getAttribute("data-integer"),
    numerator: +pfDOM.getAttribute("data-numerator"),
    denominator: +pfDOM.getAttribute("data-denominator")
  };
  pfController.makeProperFractionDraggable(pfDOM, properFraction);
});

let properFractions = pfView.generateProperFractions(cf, "double it");

properFractions.forEach(properFraction => {
  pfView.drawProperFraction(properFraction);
});
