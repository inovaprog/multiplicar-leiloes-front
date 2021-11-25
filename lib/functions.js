export default function formatarMoeda(element_id) {
    var elemento = document.getElementById(element_id);
    var value = elemento.value;

    value = value + '';
    value = parseInt(value.replace(/[\D]+/g, ''));
    value = value + '';
    value = value.replace(/([0-9]{2})$/g, ",$1");

    if (value.length > 6) {
        value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    elemento.value = value;
    if (value == 'NaN') elemento.value = '';
}