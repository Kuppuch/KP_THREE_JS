function control() {
    const params = ['Свет', 'Камера',];
    

    // generate the radio groups        
    const group = document.querySelector(".move_control")
    group.innerHTML = params.map((param) => `<div>
                <input type="radio" name="move" value="${param}" id="${param}">
                 <label for="${param}">${param}</label>
            </div>`).join(' ');

    // add an event listener for the change event
    const radioButtons = document.querySelectorAll('input[name="move"]');
    for (const radioButton of radioButtons) {
        radioButton.addEventListener('change', showSelected);
    }

    function showSelected(e) {
        console.log(e);
        // if (this.checked) {
        //     document.querySelector('#output').innerText = `You selected ${this.value}`;
        // }
    }
}