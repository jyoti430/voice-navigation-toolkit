function scanInteractiveElements(){

    const elements = document.querySelectorAll("button, a, input");
    const info = [];

    elements.forEach((element, index) => {

        const type = element.tagName;
        let elem;

        if(type == "A"){

            elem = {
                number: index+1,
                element: element,
                tag: type,
                text: element.textContent.trim(),
                id: element.id,
                label: element.textContent.trim()
            };
        }
        else if(type == "INPUT"){

            elem = {
                number: index+1,
                element: element,
                tag: type,
                type: element.type,
                placeholder: element.placeholder,
                id: element.id,
                name: element.name,
                label: element.placeholder
            };

        }
        else if(type == "BUTTON"){

            elem = {
                number: index+1,
                element: element,
                tag: type,
                text: element.textContent,
                id: element.id,
                label: element.textContent.trim()
            }
        }
        info.push(elem);
    });
    // console.log(info);
    return info;
}


const elements = scanInteractiveElements();

function clickElement(number){
    const target = elements.find(item => item.number  === number);

    if(target){
        target.element.click();
        console.log(`Clicked: ${target.label}`);
    }
    else{
        console.log("Element not found");
    }
}
// clickElement(4);

function clickElementByLabel(label){
    const target = elements.find(item => item.label.toLowerCase().trim()  === label.toLowerCase().trim() );

    if(target){
        target.element.click();
        console.log(`Clicked: ${target.label}`);
    }
    else{
        console.log("Element not found");
    }
}
// clickElementByLabel("ConTact  ");

function focusElementByLabel(label){
    const target = elements.find(item => item.label.toLowerCase().trim()  === label.toLowerCase().trim() );

    if(target && target.tag === "INPUT"){
        target.element.focus();
        console.log(`focused: ${target.label}`);
    }
    else{
        console.log("Element not found");
    }
}

function scrollPage(direction) {

    if (direction === "down") {
        window.scrollBy(0, 500);
        console.log("Scrolled down");
    }
    else if (direction === "up") {
        window.scrollBy(0, -500);
        console.log("Scrolled up");
    }
    else {
        console.log("Unknown scroll direction");
    }
}

function parseCommand(command){

    const parts = command.trim().split(/\s+/);

    let commands = {
        action: parts[0].toLowerCase()
    }

    if (!parts[1]) {
        console.log("Please Specify a Target");
        return;
    }
    const target = parts.slice(1).join(" ");

    if (!isNaN(Number(target))) {
        commands.target = Number(target);
        commands.targetType = "number";
    } 
    else {
        commands.target = target.toLowerCase();
        commands.targetType = "label";
    }

    return commands;
}

function handleCommand(command){

    const commands = parseCommand(command);

    if (!commands) {
        return;
    }

    if(commands.action === "click"){

        if (commands.targetType === "number") {
            clickElement(commands.target);
        } 
        else {
            clickElementByLabel(commands.target);
        }
    }
    else if(commands.action === "focus"){
        
        if (commands.targetType === "label") {
            focusElementByLabel(commands.target);
        }
    }
    else if(commands.action === "scroll"){
        scrollPage(commands.target);
    }
}

// handleCommand("focus search");
// handleCommand("click 2");
// handleCommand("CLICK doesnotexist");
// handleCommand("CLICK");
// handleCommand("scroll doWn");
// handleCommand("click add to cart");


