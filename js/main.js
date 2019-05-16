let elem = document.getElementById('canvas'),
    elemLeft = elem.offsetLeft,
    elemTop = elem.offsetTop,
    context = elem.getContext('2d'),
    elements = [],
    notes = [],
    rightNote = null,
    points = 0

let synth = SampleLibrary.load({
    instruments: "guitar-acoustic"
});
    
    elem.width = window.innerWidth - 100
    elem.height = 300
    
    notes = [
        {
            note: "D",
            name: "Ré",
            positions: [100,275]
        },
        {
            note: "E",
            name: "Mi",
            positions: [75,250]
        },
        {
            note: "F",
            name: "Fá",
            positions: [225,50]
        },
        {
            note: "G",
            name: "Sol",
            positions: [200,25]
        },
        {
            note: "A",
            name: "Lá",
            positions: [175]
        },
        {
            note: "B",
            name: "Sí",
            positions: [150]
        },
        {
            note: "C",
            name: "Dó",
            positions: [125]
        }
    ]


const generateSheet = () => {
    for(let i = 0; i < 5; i++){
        elements.push({
            colour: '#fff',
            width: context.canvas.clientWidth,
            height: 2,
            top: context.canvas.clientHeight / 6 + (( context.canvas.clientHeight / 6) * i),
            left: 0
        });
    }
    // Render elements.
    elements.forEach(function(element) {
        context.fillStyle = element.colour;
        context.fillRect(element.left, element.top, element.width, element.height);
    });
}
const clearCanvas = () => {
    context.clearRect(0,0,context.canvas.clientWidth,context.canvas.clientHeight)
}
const clearOptions = () => {
    document.getElementById('options').innerHTML = ""
}

const setPoints = (point) => {
    document.getElementById('points').innerHTML = point
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const checkNote = (e) => {
    
    if(e.target.id === rightNote.note){
        points++
        setPoints(points)
        generatePosition()
    }else{
        points = 0
        setPoints(points)
        document.getElementById('start').style = "";
        clearOptions()
        clearCanvas()
        generateSheet()
        alert('Você falhou miseravelmente')
    }
}
const generateOption = (note,name) => {
    let divNova = document.getElementById("options"); 
    let conteudoNovo = document.createElement('button'); 
    conteudoNovo.classList.add('option')
    conteudoNovo.id = note
    conteudoNovo.innerHTML = note + " (" + name + ")";
    conteudoNovo.onclick = checkNote
    divNova.appendChild(conteudoNovo); //adiciona o nó de texto à nova div criada 
}


generateSheet()

const startGame = () => {
    document.getElementById('start').style = "display:none";
    points = 0
    setPoints(points)
    generatePosition()
    
}

const generatePosition =  () => {
    let buttons = []
    var dotX =  Math.floor((Math.random() * (context.canvas.clientWidth - 100) + 100))
    var dotY = 25 * Math.floor((Math.random() * (12 - 1) + 1))
    
    for(let i in notes){
        let note = notes[i]
        for(let j in note.positions){
            let position = note.positions[j]
            if(position === dotY){
                console.log("Nota certa", note.name)
                rightNote = note
                buttons.push(note)
            }
        }
    }
    
    clearCanvas()
    clearOptions()
    generateSheet()
    for(let i = 0; i < 3; i++) {
        let random = notes[Math.floor(Math.random() * (notes.length - 0) + 0)]
        let exists = false;
        for(let j in buttons){
            if(buttons[j].name === random.name){
                i--
                exists = true;
                break;
            }
        }
        if(!exists){
            buttons.push(random)
        }
    }
    buttons = shuffle(buttons)
    for(let i in buttons){
        generateOption(buttons[i].note,buttons[i].name)
    }
    
    context.fillStyle = "#fff";
    context.beginPath()
    context.arc(dotX, dotY, 18, 0, 2 * Math.PI);
    context.closePath()
    context.fill(); 
    synth.toMaster().triggerAttackRelease(rightNote.note + (dotY < 150 ? "2" : "1"));

}