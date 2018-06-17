function connectLine(className, i = 0) {
    var classNameId = className.replace('.', '');
    var array = [];

    //要素の位置を取得
    $(className).each(function (index) {
        var datatop = $(this).offset().top;
        var dataleft = $(this).offset().left;
        array[i] = { "datatop": datatop, "dataleft": dataleft };
        $(this).attr("data-top", datatop).attr("data-left", dataleft);
        i++;
    });

    //角度計算
    var lineHeight = array[1].datatop - array[0].datatop;
    var lineWidth = array[1].dataleft - array[0].dataleft;

    var rad = Math.atan2(lineWidth, lineHeight);
    var degree = rad * (180 / Math.PI);


    //辺の長さ
    var lineZ = lineWidth / Math.sin(rad);

    //直角で狂うのを回避
    if (degree == 0 || degree == 180) {
        lineZ = lineHeight;
    } else if (degree == 90 || degree == 270) {
        lineZ = lineWidth;
    };

    $(className).css("position", "relative");

    //最初の一回だけ実行
    if (!$('.connect-line-' + classNameId).length) {
        $(className + ":first").append('<span class="connect-line-line connect-line-' + classNameId + '"></span>');
        $(className).wrapInner('<span class="connect-line-point"></span>');
        $(className + ":first connect-line-point").addClass('connect-line-point-first');
    }

    $(".connect-line-" + classNameId).css("transform", "rotate(" + -degree + "deg)").css("height", lineZ + "px").css("background", "red");
}
