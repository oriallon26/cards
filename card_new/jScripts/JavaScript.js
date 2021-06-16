$(document).ready(function () {


    let
        cardContainer = document.querySelector('#cardCanvas'),// דיב שמכיל את התמונה 
        imageNum = 0,
        parentPos,//משתנים לבדיקת המיקום של הכיתוב
        TXTnum = 0,
        relativePos,
        currentItem,
        family;// משתנה לשמירת הפונט הנבחר


    let resizing = false;
    var handleNum = 0;
    $("#deleteImage").hide();
    $("#deleteTXT").hide();
    $("#deleteSticker").hide();
    //----------------העלאת תמונה --------------------//

    document.getElementById('file').onchange = function (e) {


        var ext = this.value.match(/\.([^\.]+)$/)[1];
        switch (ext) {
            case 'JPG':
            case 'jpg':
            case 'jpeg':
            case 'JPEG':
            case 'BMP':
            case 'bmp':
            case 'PNG':
            case 'png':
            case 'tif':
            case 'TIF':
            case 'GIF':
            case 'gif':

                if (this.files && this.files[0]) {

                    var reader = new FileReader();

                    reader.onload = function (e) {
                        var image = document.createElement('img');
                        image.id = "userImage" + imageNum;
                        image.classList = "userImageClass " + imageNum;
                        image.src = e.target.result;

                        imgSrcCopy = image.src;

                        image.onload = function () {

                            var resizeDiv = document.createElement('div');
                            resizeDiv.classList = "resizerHandels " + handleNum;
                            resizeDiv.id = "resizerHandelsDiv" + handleNum;

                            cardContainer.appendChild(resizeDiv);
                            resizeDiv.appendChild(image);

                            var resizerNe = document.createElement('span');
                            resizerNe.classList = "resizer ne " + handleNum;
                            var resizerNw = document.createElement('span');
                            resizerNw.classList = "resizer nw " + handleNum;
                            var resizerSw = document.createElement('span');
                            resizerSw.classList = "resizer sw " + handleNum;
                            var resizerSe = document.createElement('span');
                            resizerSe.classList = "resizer se " + handleNum;

                            resizeDiv.appendChild(resizerNe);
                            resizeDiv.appendChild(resizerNw);
                            resizeDiv.appendChild(resizerSw);
                            resizeDiv.appendChild(resizerSe);
                            console.log(document.getElementById("userImage" + imageNum).clientHeight)
                            console.log(document.getElementById("userImage" + imageNum).clientWidth)

                            if (document.getElementById("userImage" + imageNum).clientHeight < document.getElementById("userImage" + imageNum).clientWidth) {
                                $("#userImage" + imageNum).css("width", "10vw");
                                $("#userImage" + imageNum).css("height", "auto");
                                console.log("רוחב")

                            } else {
                                $("#userImage" + imageNum).css("width", "auto");
                                $("#userImage" + imageNum).css("height", "10vw");
                                console.log("אורך")
                            }

                            $(".resizerHandels").css("position", "absolute");

                            $(".resizerHandels " + handleNum).height = $("#userImage" + imageNum).height;

                            TouchdragElement(document.getElementById("resizerHandelsDiv" + handleNum));

                            const resizers = document.querySelectorAll(".resizer");
                            for (let resizer of resizers) {
                                console.log("ONE");
                                resizer.addEventListener("click", Resize);
                                resizer.addEventListener("touchstart", Resize);

                            }
                            document.getElementById("container").addEventListener("click", removeResizer);

                            imageNum++;
                            handleNum++;
                        };


                    }
                    reader.readAsDataURL(this.files[0]);
                }
                break;
            default:
                this.value = '';

        }
    };
    /*-------start--------------add txt/ remove txt/ drag txt--------------start------------------------*/

    var currentTXTitem;
    $("#addTxtBtn").click(function () {
        var textAreaDiv = document.createElement('div');
        textAreaDiv.classList = "textAreaDiv " + TXTnum;
        textAreaDiv.id = "textAreaDivID" + TXTnum;
        var textArea = document.createElement('textarea');
        textArea.classList = "textAreaClass " + TXTnum;
        textArea.id = "textArea" + TXTnum;
        cardContainer.appendChild(textAreaDiv);
        textAreaDiv.appendChild(textArea);

        currentTXTitem = textArea.id;
        console.log(currentTXTitem);
        textAreaDiv.addEventListener("mousedown", Drag);
        document.getElementById("textArea" + TXTnum).addEventListener("dblclick", removeDrag);

        var resizerNe = document.createElement('span');
        resizerNe.classList = "TXTresizer ne ";
        var resizerNw = document.createElement('span');
        resizerNw.classList = "TXTresizer nw ";
        var resizerSw = document.createElement('span');
        resizerSw.classList = "TXTresizer sw ";
        var resizerSe = document.createElement('span');
        resizerSe.classList = "TXTresizer se ";

        textAreaDiv.appendChild(resizerNe);
        textAreaDiv.appendChild(resizerNw);
        textAreaDiv.appendChild(resizerSw);
        textAreaDiv.appendChild(resizerSe);

        const resizers = document.querySelectorAll(".TXTresizer");
        for (let resizer of resizers) {
            console.log("ONE");
            resizer.addEventListener("click", TXTresizer);
        }

        document.getElementById("container").addEventListener("click", removeResizer);
        setTimeout(function () {
            if ($(".textAreaDiv " + (TXTnum - 1))) {
                console.log('Element exists');
                var TXTdiv = document.getElementsByClassName("textAreaDiv " + (TXTnum - 1))
                var TXTdivJQ = $(TXTdiv).find(".TXTresizer").show();
                console.log(TXTdivJQ)
                $("#textArea" + (TXTnum - 1)).css("border", "solid black");

            }

        }, 10);

        TXTnum++

    });
    var currentNum;
    function Drag(e) {
        var currentT = e.target;
        currentTXTitem = e.target.id;

        console.log(((e.target).parentElement));
        console.log(document.getElementById((e.target).id).parentElement.classList.value)
        if (document.getElementById((e.target).id).parentElement.classList.contains("textAreaDiv")) {
            currentNum = (document.getElementById((e.target).id).parentElement.classList.value).slice(12, 13);

            var TXTA = document.getElementById("textAreaDivID" + currentNum);

            TouchdragElement(TXTA);
            $("#textArea" + currentNum).focus();


        }
    }

    function removeDrag() {
        //console.log("REMOVEdrag")
        //var TXTA = document.getElementById("textAreaDivID");

        //document.getElementById("textArea").removeEventListener("mousedown", dragElement(TXTA));
        //document.getElementById("textArea").disabled = false;
        // console.log("TWO")
        // $("#textArea" + currentNum).select();
    }
    var currentTnum;
    function borderText(e) {

        $(".textAreaClass ").mousemove(function (e) {
            console.log("HOVER");
            currentTnum = ((e.target).id).slice(8, 9)
            console.log(currentTnum)
            $("#textArea" + currentTnum).css("border", "solid black");
        });
        $(".textAreaClass ").mouseout(function (e) {
            console.log("OUT");
            console.log(currentTnum)
            $("#textArea" + currentTnum).css("border", "none");
        });
    }
    /*-------end--------------add txt/ remove txt/ drag txt--------------end------------------------*/


    /*-------start--------------Delete Selcected Item--------------start------------------------*/

    $(".deleteImageClass").click(function () {
        console.log("deleteImage");
        currentItem.remove();

    });


    $("#deleteTXT").click(function () {
        console.log("deleteImage");
        currentItem.remove();

    });
    /*-------END-----------------Delete Selcected Item----------------------END-------------*/

    //--------------start----------remove resize handels from images-------------start------------------//
    function removeResizer(e) {
        console.log("YAY")
        $(".resizer").hide();
        $(".TXTresizer").hide();
        $("#deleteImage").hide();
        $("#deleteSticker").hide();
        $("#deleteTXT").hide();
        $(".textAreaClass").css("border", "none");

        borderText();
        console.log((e.target).classList);
        var container;
        if ($(e.target).hasClass("textAreaClass")) {

            for (var i = 0; i < TXTnum; i++) {
                console.log("FOR");
                if (i == ((e.target).id).slice(8, 9)) {
                    console.log(i);
                    container = document.getElementsByClassName("textAreaClass " + i)
                    container = $(container);
                    console.log(e.target);



                    console.log("if");
                    console.log(e.target.id);
                    if (container.is(e.target)) {
                        console.log("MOUSE");

                        console.log(($(e.target.parentElement).find(".TXTresizer")));
                        currentItem = $(e.target.parentElement);
                        $(".TXTresizer").hide();
                        $("#deleteTXT").show();
                        container.css("border", "none");
                        ($(e.target.parentElement).find(".TXTresizer")).show();
                        break;

                    } else {
                        $("#deleteTXT").hide();
                        container.css("border", "solid black");
                        ($(e.target.parentElement).find(".TXTresizer")).hide();
                    }

                }
            }
        }

        if ($(e.target).hasClass("userImageClass")) {

            for (var i = 0; i < imageNum; i++) {
                console.log("FOR");
                if (i == ((e.target).id).slice(9, 10)) {
                    console.log(i);
                    container = document.getElementsByClassName("userImageClass " + i)
                    container = $(container);
                    console.log(e.target);

                    console.log("if");
                    if (container.is(e.target)) {
                        console.log("MOUSE");

                        console.log(($(e.target.parentElement).find(".resizer")));
                        currentItem = $(e.target.parentElement);
                        $(".resizer").hide();
                        $("#deleteImage").show();
                        $("#deleteSticker").show();

                        ($(e.target.parentElement).find(".resizer")).show();
                        break;
                    } else {
                        $("#deleteImage").hide();
                        $("#deleteSticker").hide();
                        ($(e.target.parentElement).find(".resizer")).hide();
                    }

                }
            }
        }
    };
    //--------------END----------remove resize handels from images-------------END------------------//

    //--------------start----------change background color-------------start------------------//


    document.querySelector("#BcakgroundColor").addEventListener('input', () => {

        $("#cardCanvas").css("background-color", $('#BcakgroundColor').val());
        $("#cardCanvas").css("background-image", "none");
        console.log($('#BcakgroundColor').val());
        if ($('#BcakgroundColor').val() == "#ffffff") {
            $("#cardCanvas").css("border", "solid black 1px");
        } else {
            $("#cardCanvas").css("border", "none");
        }

    });

    //--------------end----------change background color-------------end------------------//

    //--------------start----------change background img-------------start------------------//


    document.querySelector("#bg1").addEventListener('click', () => {
        console.log(document.querySelector("#bg1").src)
        $("#cardCanvas").css("background-color", "none");
        $("#cardCanvas").css("background-image", 'url(' + document.querySelector("#bg1").src + ')');
        $("#cardCanvas").css("background-size", "cover");

    });

    document.querySelector("#bg2").addEventListener('click', () => {

        $("#cardCanvas").css("background-color", "none");
        $("#cardCanvas").css("background-image", 'url(' + document.querySelector("#bg2").src + ')');
        $("#cardCanvas").css("background-size", "cover");
    });

    document.querySelector("#bg3").addEventListener('click', () => {

        $("#cardCanvas").css("background-color", "none");
        $("#cardCanvas").css("background-image", 'url(' + document.querySelector("#bg3").src + ')');
        $("#cardCanvas").css("background-size", "cover");
    });

    //--------------end----------change background img-------------end------------------//


    /*---------start-----------Font color picker----------------start--------------------*/
    document.querySelector("#fontColor").addEventListener('input', () => {

        document.getElementById(currentTXTitem).style.color = $('#fontColor').val();

    });

    /*---------End-----------Font color picker----------------end--------------------*/


    /*------------start-------------- change Font----------start--------------*/
    $("#selectFont").change(function () {
        var selector = document.getElementById('selectFont');
        family = selector.options[selector.selectedIndex].value;

        document.getElementById(currentTXTitem).style.fontFamily = family;

    });
    /*------------END-------------- change Font----------END--------------*/

    $("#selectFont").change(function () {
        var selector = document.getElementById('selectFont');
        family = selector.options[selector.selectedIndex].value;

        document.getElementById(currentTXTitem).style.fontFamily = family;

    });

    /*------START----------change font size---------START-----------*/
    for (var i = 1; i < 50; i++) {
        var fontSizeOption = document.createElement("option");
        fontSizeOption.text += i;
        document.getElementById("SelectFontSize").appendChild(fontSizeOption);

    }
    var chosenFontSize;
    $("#SelectFontSize").change(function () {
        console.log("fontSize")
        var selector = document.getElementById('SelectFontSize');
        chosenFontSize = selector.options[selector.selectedIndex].value;

        document.getElementById(currentTXTitem).style.fontSize = chosenFontSize + "px";

    });
    /*------END----------change font size---------END-----------*/

    /*---------------START---------------DRAG FUNC------------------START--------------*/

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        console.log("HERE")
        elmnt.onmousedown = dragMouseDown;
        elmnt.ontouchstart = dragMouseDown;


        function dragMouseDown(e) {
            console.log("HERE2")
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.ontouchend = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
            document.ontouchmove = elementDrag;

        }

        function elementDrag(e) {
            if (!resizing) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;

                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";


                parentPos = document.getElementById('cardCanvas').getBoundingClientRect(),
                    childrenPos = elmnt.getBoundingClientRect();
                relativePos = {};

                relativePos.top = childrenPos.top - parentPos.top,
                    relativePos.right = childrenPos.right - parentPos.right,
                    relativePos.bottom = childrenPos.bottom - parentPos.bottom,
                    relativePos.left = childrenPos.left - parentPos.left;

                console.log('Object {top: ' + relativePos.top + ', right: ' + relativePos.right + ', bottom: ' + relativePos.bottom + ', left: ' + relativePos.left + '}');

                if (childrenPos.top - 8 < parentPos.top) {
                    console.log("1")
                    closeDragElement();
                }
                if (childrenPos.right + 8 > parentPos.right) {
                    console.log("2")
                    closeDragElement();
                }
                if (childrenPos.bottom + 8 > parentPos.bottom) {
                    console.log("3")
                    closeDragElement();
                }
                if (childrenPos.left - 8 < parentPos.left) {
                    console.log("4")
                    closeDragElement();
                }
            }
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            document.ontouchend = null;
            document.ontouchmove = null;
        }

    }

    /*-------------END-----------------DRAG FUNC------------------END--------------*/

    /*---------------START---------------DRAG FUNC------------------START--------------*/

    function TouchdragElement(elmnt) {
        if ("ontouchstart" in document.documentElement) {
            var mainDraggable = new Draggable(elmnt);

            console.log("your device is a touch screen device.");

            $(elmnt).on("mousedown touchstart", function (e) {
                mainDraggable.enable();

            });

        } else {
            console.log(" screen device.");
            dragElement(elmnt);
        }
    }

    /*-------------END-----------------DRAG FUNC------------------END--------------*/

    /*-------------start-----------------resize pic FUNC------------------start--------------*/

    function Resize() {

        console.log("RE")
        const element = document.querySelector(".resizerHandels");

        const resizers = document.querySelectorAll(".resizer");
        let currentResizer;

        for (let resizer of resizers) {
            console.log("for");
            resizer.addEventListener("mousedown", mousedown);
            resizer.addEventListener("touchstart", mousedown);
            function mousedown(e) {
                console.log("down")
                currentResizer = e.target;
                resizing = true;
                let prevX = e.clientX;
                let prevY = e.clientY;

                window.addEventListener("mousemove", mousemove);
                window.addEventListener("mouseup", mouseup);
                window.addEventListener("touchmove", mousemove);
                window.addEventListener("touchend", mouseup);

                function mousemove(e) {
                    console.log(document.getElementById((currentResizer.parentElement).id));
                    console.log(((currentResizer.parentElement).id).slice(17, 18));
                    const rec = (document.getElementById((currentResizer.parentElement).id)).getBoundingClientRect();

                    if (currentResizer.classList.contains("se")) {
                        console.log("se");
                        (document.getElementById((currentResizer.parentElement).id)).style.width = rec.width - (prevX - e.clientX) + "px";
                        (document.getElementById((currentResizer.parentElement).id)).style.height = "auto";

                        document.getElementById("userImage" + ((currentResizer.parentElement).id).slice(17, 18)).style.width = (document.getElementById((currentResizer.parentElement).id)).clientWidth + "px";
                        document.getElementById("userImage" + ((currentResizer.parentElement).id).slice(17, 18)).style.height = "auto";
                    }
                    if (currentResizer.classList.contains("sw")) {
                        console.log("sw");
                        (document.getElementById((currentResizer.parentElement).id)).style.width = rec.width - (prevX - e.clientX) + "px";
                        (document.getElementById((currentResizer.parentElement).id)).style.height = "auto";

                        document.getElementById("userImage" + ((currentResizer.parentElement).id).slice(17, 18)).style.width = (document.getElementById((currentResizer.parentElement).id)).clientWidth + "px";
                        document.getElementById("userImage" + ((currentResizer.parentElement).id).slice(17, 18)).style.height = "auto";
                    }
                    if (currentResizer.classList.contains("ne")) {
                        console.log("ne");
                        (document.getElementById((currentResizer.parentElement).id)).style.width = rec.width - (prevX - e.clientX) + "px";
                        (document.getElementById((currentResizer.parentElement).id)).style.height = "auto";

                        document.getElementById("userImage" + ((currentResizer.parentElement).id).slice(17, 18)).style.width = (document.getElementById((currentResizer.parentElement).id)).clientWidth + "px";
                        document.getElementById("userImage" + ((currentResizer.parentElement).id).slice(17, 18)).style.height = "auto";
                    }
                    if (currentResizer.classList.contains("nw")) {
                        console.log("nw");
                        (document.getElementById((currentResizer.parentElement).id)).style.width = rec.width - (prevX - e.clientX) + "px";
                        (document.getElementById((currentResizer.parentElement).id)).style.height = "auto";

                        document.getElementById("userImage" + ((currentResizer.parentElement).id).slice(17, 18)).style.width = (document.getElementById((currentResizer.parentElement).id)).clientWidth + "px";
                        document.getElementById("userImage" + ((currentResizer.parentElement).id).slice(17, 18)).style.height = "auto";
                    }

                    prevX = e.clientX;
                    prevY = e.clientY;
                }

                function mouseup() {
                    resizing = false;
                    window.removeEventListener("mousemove", mousemove);
                    window.removeEventListener("mouseup", mouseup);
                }


            }
        }
    }

    /*-------------END-----------------resize pic FUNC------------------END--------------*/

    /*-------------start-----------------resize TXT FUNC------------------start--------------*/

    function TXTresizer() {
        console.log("HI");
        const element = document.querySelector(".resizerHandels");

        const resizers = document.querySelectorAll(".TXTresizer");
        let currentResizer;

        for (let resizer of resizers) {
            console.log("for");
            resizer.addEventListener("mousedown", mousedown);

            function mousedown(e) {
                console.log("down")
                currentResizer = e.target;
                resizing = true;
                let prevX = e.clientX;
                let prevY = e.clientY;

                window.addEventListener("mousemove", mousemove);
                window.addEventListener("mouseup", mouseup);

                function mousemove(e) {
                    console.log(((currentResizer.parentElement).id).slice(13, 14))
                    const rec = (document.getElementById((currentResizer.parentElement).id)).getBoundingClientRect();

                    if (currentResizer.classList.contains("se")) {
                        console.log("se");
                        (document.getElementById((currentResizer.parentElement).id)).style.width = rec.width - (prevX - e.clientX) + "px";
                        (document.getElementById((currentResizer.parentElement).id)).style.height = rec.height - (prevY - e.clientY) + "px";

                        document.getElementById("textArea" + ((currentResizer.parentElement).id).slice(13, 14)).style.width = (document.getElementById((currentResizer.parentElement).id)).clientWidth + "px";
                        document.getElementById("textArea" + ((currentResizer.parentElement).id).slice(13, 14)).style.height = (document.getElementById((currentResizer.parentElement).id)).clientHeight + "px";
                    }
                    if (currentResizer.classList.contains("sw")) {
                        console.log("sw");
                        (document.getElementById((currentResizer.parentElement).id)).style.width = rec.width - (prevX - e.clientX) + "px";
                        (document.getElementById((currentResizer.parentElement).id)).style.height = rec.height - (prevY - e.clientY) + "px";

                        document.getElementById("textArea" + ((currentResizer.parentElement).id).slice(13, 14)).style.width = (document.getElementById((currentResizer.parentElement).id)).clientWidth + "px";
                        document.getElementById("textArea" + ((currentResizer.parentElement).id).slice(13, 14)).style.height = (document.getElementById((currentResizer.parentElement).id)).clientHeight + "px";
                    }
                    if (currentResizer.classList.contains("ne")) {
                        console.log("ne");
                        (document.getElementById((currentResizer.parentElement).id)).style.width = rec.width - (prevX - e.clientX) + "px";
                        (document.getElementById((currentResizer.parentElement).id)).style.height = rec.height - (prevY - e.clientY) + "px";

                        document.getElementById("textArea" + ((currentResizer.parentElement).id).slice(13, 14)).style.width = (document.getElementById((currentResizer.parentElement).id)).clientWidth + "px";
                        document.getElementById("textArea" + ((currentResizer.parentElement).id).slice(13, 14)).style.height = (document.getElementById((currentResizer.parentElement).id)).clientHeight + "px";
                    }
                    if (currentResizer.classList.contains("nw")) {
                        console.log("nw");
                        (document.getElementById((currentResizer.parentElement).id)).style.width = rec.width - (prevX - e.clientX) + "px";
                        (document.getElementById((currentResizer.parentElement).id)).style.height = rec.height - (prevY - e.clientY) + "px";

                        document.getElementById("textArea" + ((currentResizer.parentElement).id).slice(13, 14)).style.width = (document.getElementById((currentResizer.parentElement).id)).clientWidth + "px";
                        document.getElementById("textArea" + ((currentResizer.parentElement).id).slice(13, 14)).style.height = (document.getElementById((currentResizer.parentElement).id)).clientHeight + "px";
                    }

                    prevX = e.clientX;
                    prevY = e.clientY;
                }

                function mouseup() {
                    resizing = false;
                    window.removeEventListener("mousemove", mousemove);
                    window.removeEventListener("mouseup", mouseup);
                }


            }
        }
    }

    /*-------------END-----------------resize TXT FUNC------------------END--------------*/

    /*-------------Start-----------------collapse  FUNC------------------Start--------------*/
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
    /*-------------END-----------------collapse  FUNC------------------END--------------*/

    /*--------------------------------------------Stickers FUNC-------------------------------------------------------------*/

    $("#sticker1").click(function () {
        var addSticker = document.createElement("img");
        // console.log($("#sticker1").src);
        addSticker.src = document.getElementById("sticker1").src;
        addSticker.id = "userImage" + imageNum;
        addSticker.classList = "userImageClass " + imageNum;
        addSticker.onload = function () {

            var resizeDiv = document.createElement('div');
            resizeDiv.classList = "resizerHandels " + handleNum;
            resizeDiv.id = "resizerHandelsDiv" + handleNum;

            cardContainer.appendChild(resizeDiv);
            resizeDiv.appendChild(addSticker);

            var resizerNe = document.createElement('span');
            resizerNe.classList = "resizer ne " + handleNum;
            var resizerNw = document.createElement('span');
            resizerNw.classList = "resizer nw " + handleNum;
            var resizerSw = document.createElement('span');
            resizerSw.classList = "resizer sw " + handleNum;
            var resizerSe = document.createElement('span');
            resizerSe.classList = "resizer se " + handleNum;

            resizeDiv.appendChild(resizerNe);
            resizeDiv.appendChild(resizerNw);
            resizeDiv.appendChild(resizerSw);
            resizeDiv.appendChild(resizerSe);

            $(".resizerHandels").css("position", "absolute");

            TouchdragElement(document.getElementById("resizerHandelsDiv" + handleNum));
            const resizers = document.querySelectorAll(".resizer");
            for (let resizer of resizers) {
                console.log("ONE");
                resizer.addEventListener("click", Resize);
            }
            document.getElementById("container").addEventListener("click", removeResizer);
            handleNum++
            imageNum++
        };
    });

    $("#sticker2").click(function () {
        var addSticker = document.createElement("img");
        console.log($("#sticker2").src);
        addSticker.src = document.getElementById("sticker2").src;
        addSticker.id = "userImage" + imageNum;
        addSticker.classList = "userImageClass " + imageNum;

        addSticker.onload = function () {
            var resizeDiv = document.createElement('div');
            resizeDiv.classList = "resizerHandels " + handleNum;
            resizeDiv.id = "resizerHandelsDiv" + handleNum;

            cardContainer.appendChild(resizeDiv);
            resizeDiv.appendChild(addSticker);

            var resizerNe = document.createElement('span');
            resizerNe.classList = "resizer ne " + handleNum;
            var resizerNw = document.createElement('span');
            resizerNw.classList = "resizer nw " + handleNum;
            var resizerSw = document.createElement('span');
            resizerSw.classList = "resizer sw " + handleNum;
            var resizerSe = document.createElement('span');
            resizerSe.classList = "resizer se " + handleNum;

            resizeDiv.appendChild(resizerNe);
            resizeDiv.appendChild(resizerNw);
            resizeDiv.appendChild(resizerSw);
            resizeDiv.appendChild(resizerSe);

            $(".resizerHandels").css("position", "absolute");

            TouchdragElement(document.getElementById("resizerHandelsDiv" + handleNum));

            const resizers = document.querySelectorAll(".resizer");
            for (let resizer of resizers) {
                console.log("ONE");
                resizer.addEventListener("click", Resize);
            }
            document.getElementById("container").addEventListener("click", removeResizer);
            handleNum++
            imageNum++
        };
    });


    $("#sticker3").click(function () {
        var addSticker = document.createElement("img");
        console.log($("#sticker3").src);
        addSticker.src = document.getElementById("sticker3").src;
        addSticker.id = "userImage" + imageNum;
        addSticker.classList = "userImageClass " + imageNum;

        addSticker.onload = function () {
            var resizeDiv = document.createElement('div');
            resizeDiv.classList = "resizerHandels " + handleNum;
            resizeDiv.id = "resizerHandelsDiv" + handleNum;

            cardContainer.appendChild(resizeDiv);
            resizeDiv.appendChild(addSticker);

            var resizerNe = document.createElement('span');
            resizerNe.classList = "resizer ne " + handleNum;
            var resizerNw = document.createElement('span');
            resizerNw.classList = "resizer nw " + handleNum;
            var resizerSw = document.createElement('span');
            resizerSw.classList = "resizer sw " + handleNum;
            var resizerSe = document.createElement('span');
            resizerSe.classList = "resizer se " + handleNum;

            resizeDiv.appendChild(resizerNe);
            resizeDiv.appendChild(resizerNw);
            resizeDiv.appendChild(resizerSw);
            resizeDiv.appendChild(resizerSe);

            $(".resizerHandels").css("position", "absolute");

            TouchdragElement(document.getElementById("resizerHandelsDiv" + handleNum));

            const resizers = document.querySelectorAll(".resizer");
            for (let resizer of resizers) {
                console.log("ONE");
                resizer.addEventListener("click", Resize);
            }
            document.getElementById("container").addEventListener("click", removeResizer);
            handleNum++
            imageNum++
        };
    });

    /*-------------START-----------------DOWNLOAD CARD FUNC------------------START--------------*/
    $("#downloadBTN").click(function () {
        $(".resizer").hide();
        $(".TXTresizer").hide();
        html2canvas(document.querySelector("#cardCanvas")).then(canvas => {

            document.body.appendChild(canvas)
            $("canvas").hide();

            var canvasImg = canvas.toDataURL("image/jpg");
            var linkToDownload = document.createElement("a");
            linkToDownload.id = "linkToDownload";
            var imageDownload = document.querySelector('#buttonDiv');
            imageDownload.appendChild(linkToDownload);
            document.getElementById("linkToDownload").href = canvasImg;
            linkToDownload.download = "image.png";


            setTimeout(function () {
                linkToDownload.click();
                $("#linkToDownload").remove();
            }, 1000);

        });
    });

    /*-------------END-----------------DOWNLOAD CARD FUNC------------------END--------------*/
});