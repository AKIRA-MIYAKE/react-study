import greeting from '../../common/greeting';

document.addEventListener('DOMContentLoaded', () => {
  var greetingElement = document.getElementById('greeting');
  var greetingTextNode = document.createTextNode(greeting('Nodeyard'));
  greetingElement.appendChild(greetingTextNode);

  var initialData = JSON
    .parse(document.getElementById('initial-data').getAttribute('data-json'));
  var fizzElement = document.getElementById('fizz');
  var fizzTextNode = document.createTextNode(initialData.fizz);
  fizzElement.appendChild(fizzTextNode);
});
