'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_WIDTH = 50;
var barHeigth = 150;
var BAR_WIDTH = 40;
var DISTANCE = 50;

var MAX_BAR_HEIGHT = 150;
var GISTOGRAMM_MARGIN_TOP = 100;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var name = names[i];

    var barWidth = 40;
    var barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;
    var barX = 120;
    var barY = GISTOGRAMM_MARGIN_TOP + MAX_BAR_HEIGHT - barHeight;

    if (name === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.filter = 'none';
    } else {
      ctx.fillStyle = 'blue';
      ctx.filter = 'saturate(' + Math.random() + ')';
    }

    ctx.fillRect(barX + (BAR_WIDTH + DISTANCE) * i, barY, barWidth, barHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), barX + (BAR_WIDTH + DISTANCE) * i, barY - GAP);
    ctx.fillText(names[i], barX + (BAR_WIDTH + DISTANCE) * i, CLOUD_Y + barHeigth + TEXT_WIDTH + TEXT_WIDTH + GAP);
  }
};
