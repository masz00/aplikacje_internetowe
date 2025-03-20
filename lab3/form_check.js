
function isWhiteSpaceOrEmpty(str) {
    return /^[\s\t\r\n]*$/.test(str);
}


function isEmailInvalid(str) {
    let emailPattern = /^[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+$/;
    return !emailPattern.test(str);
}


function checkStringAndFocus(obj, msg, validationFunc = isWhiteSpaceOrEmpty) {
    let str = obj.value;
    let errorFieldName = "e_" + obj.name.substr(2);
    let errorField = document.getElementById(errorFieldName);

    if (validationFunc(str)) {
        errorField.innerHTML = msg;
        obj.focus();
        return false;
    } else {
        errorField.innerHTML = ""; 
        return true;
    }
}

function validate(form) {
    let valid = true;
    
    valid &= checkStringAndFocus(form.elements["f_imie"], "Podaj imię!");
    valid &= checkStringAndFocus(form.elements["f_nazwisko"], "Podaj nazwisko!");
    valid &= checkStringAndFocus(form.elements["f_kod"], "Podaj kod pocztowy!");
    valid &= checkStringAndFocus(form.elements["f_ulica"], "Podaj ulicę!");
    valid &= checkStringAndFocus(form.elements["f_miasto"], "Podaj miasto!");
    valid &= checkStringAndFocus(form.elements["f_email"], "Podaj właściwy e-mail!", isEmailInvalid);

    return valid;
}

function showElement(e) {
    document.getElementById(e).style.visibility = 'visible';
}
function hideElement(e) {
    document.getElementById(e).style.visibility = 'hidden';
}

function alterRows(i, e) {
    if (e) {
        if (i % 2 === 1) {
            e.setAttribute("style", "background-color: Aqua;");
        }
        e = e.nextSibling;
        while (e && e.nodeType !== 1) {
            e = e.nextSibling;
        }
        alterRows(++i, e);
    }
}
window.onload = function () {
    alterRows(1, document.getElementsByTagName("tr")[0]);
};

function nextNode(e) {
    while (e && e.nodeType !== 1) {
        e = e.nextSibling;
    }
    return e;
}

function prevNode(e) {
    while (e && e.nodeType !== 1) {
        e = e.previousSibling;
    }
    return e;
}

function swapRows(b) {
    let tab = prevNode(b.previousSibling);
    let tBody = nextNode(tab.firstChild);
    let lastNode = prevNode(tBody.lastChild);
    tBody.removeChild(lastNode);
    let firstNode = nextNode(tBody.firstChild);
    tBody.insertBefore(lastNode, firstNode);
}

function cnt(form, msg, maxSize) {
    if (form.value.length > maxSize) {
        form.value = form.value.substring(0, maxSize);
    } else {
        msg.innerHTML = maxSize - form.value.length;
    }
}
