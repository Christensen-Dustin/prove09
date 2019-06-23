function displayWeight() {
    var select = document.getElementById("weight");
    var type = document.getElementById("type").value;
    var weights = [];
    
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    
    if (type == "stamped") {
        weights = stampedWeight();
    }
    if (type == "metered") {
        weights = meteredWeight();
    }
    if (type == "large-flat") {
        weights = largeflatWeight();
    }
    if (type == "first-class") {
        weights = firstclassWeight();
    }
    if (type == "nothing") {
        weights = noWeight();
    }
    
    for (var i = 0; i < weights.length; i++) {
        var weight = weights[i];
        var option = document.createElement("option");
        option.textContent = "less than " + weight + " oz.";
        option.value = weight;
        select.appendChild(option);
    }
    
    weights = emptyWeight(weights);
}

function stampedWeight() {
    return [1, 2, 3, 3.5];
}

function meteredWeight() {
    return [1, 2, 3, 3.5];
}

function largeflatWeight() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
}

function firstclassWeight() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
}

function noWeight() {
    return [];
}

function emptyWeight(weight) {
    for(var i = 0; i < weight.length; i++) {
        delete weight[i];
    }
    weight.length = 0;
    
    return weight;
}
