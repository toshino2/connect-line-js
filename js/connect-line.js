function connectLine(className, i = 0) {
    var classNameId = className.replace('.', '');
    var array = [];
    $(className).each(function (index) {
        var datatop = $(this).offset().top;
        var dataleft = $(this).offset().left;
        array[i] = { "datatop": datatop, "dataleft": dataleft };
        $(this).attr("data-top", datatop).attr("data-left", dataleft);
        //$(this).attr("id", classNameId + (i + 1));
        $(this).wrapInner('<span class="connect-line-point"></span>');
        i++;
    });

    //角度計算
    var lineHeight = array[1].datatop - array[0].datatop;
    var lineWidth = array[1].dataleft - array[0].dataleft;

    var rad = Math.atan2(lineWidth, lineHeight);
    var degree = rad * (180 / Math.PI);

    //辺の長さ
    var lineZ = lineWidth / Math.sin(rad);

    $(className).css("position", "relative");
    $(className + ":first").append('<span class="connect-line-line connect-line-' + classNameId + '"></span>');
    $(".connect-line-" + classNameId).css("transform", "rotate(" + -degree + "deg)").css("height", lineZ + "px").css("background", "red");
}
