function useState(initialValue) {
    let currentValue = initialValue;
    let listeners = new Set();
    let setterFunction = function (newValue) {
        currentValue = newValue;
        for (const listener of listeners) {
            if (listener) {
                listener(currentValue);
            }
        }
    };
    let getterFunction = function (listener) {
        listeners.add(listener);
        return currentValue;
    }
    return [getterFunction, setterFunction];
}
 
const [count, setCount] = useState(10);
 
class SomeComponent {
    bindedFunction = null;
    constructor(countState) {
        this.countState = countState;
        this.bindedFunction = this.onCountValueChanged.bind(this);
    }
    onCountValueChanged() {
       //console.log("CHANGED");
       this.render();
    }
 
    render() {
        console.log("<h1>" + this.countState(this.bindedFunction) + "</h1>");
    }
}
 
const cmp = new SomeComponent(count);
cmp.render();
setCount(999);
