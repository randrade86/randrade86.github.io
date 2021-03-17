function parseTlv() {
    var tlvbuffer = $('#buffer').val();
    var length = tlvbuffer.length;
    var tag;

    var tagLen = 2;
    var lenLen = 2;

    var len;
    var i = 0;
    var j = 0;
    var output = '';
    var start = 0;
    var end = 0;
    var zero = 0;
    var tlva = [];
    tlva.push(["TAG", "LENGTH", "VALUE"]);

    while (length > i) {
        tag = tlvbuffer.slice(zero, tagLen);
        start = parseInt(tagLen);
        end = parseInt(tagLen) + parseInt(lenLen);
        len = tlvbuffer.slice(start, end);
        start = parseInt(tagLen) + parseInt(lenLen);
        end = parseInt(start) + parseInt(len);
        value = tlvbuffer.slice(start, end);
        if (value.length !== parseInt(len) && value.length > 0) {
            alert('Format is invalid: ' + value.length + ' != ' + parseInt(len));
            break;
        }
        output += tag + '    ' + len + '    ' + value + '\n';
        tlva.push([tag, len, value]);
        tlvbuffer = tlvbuffer.slice(zero + end);
        i = start + end;
    }
    var table = document.createElement("TABLE");
    // table.border = "1";
    //Get the count of columns.
    var tlvaCount = tlva[0].length;
    //Add the header row.
    var row = table.insertRow(-1);
    for (i = 0; i < tlvaCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = tlva[0][i];
        row.appendChild(headerCell);
    }

    //Add the data rows.
    for (var i = 1; i < tlva.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < tlvaCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = tlva[i][j];
        }
    }
//	alert(table);

    var w = window.open('blank', '', 'width=400,height=600,resizeable,scrollbars');
    w.document.write('<html><head><title>Parser Results</title></head><body><p>Results:</p></body></html>');
    w.document.body.style.backgroundColor = "#ffe030";
    w.document.body.style.fontSize = ".8em";
    w.document.body.style.fontFamily = "courier";
    var htbody = w.document.getElementsByTagName('p')[0];
    htbody.innerHTML = "";
    htbody.appendChild(table);
}