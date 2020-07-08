


function payment(){
  // var data= document.getElementById("payment-form").submit();
  console.log('==================')
  var stripe = Stripe('pk_test_51H0hOeJ5nSY4c5DA2cfV1Tv6LG1GbKx2wLunxpRedM2MngFTgty1g1tEJQXhwSe28lgDsHcfl0Xy6OiVGvr1sSYs00Ovbdmo9v');
// var elements = stripe.elements();

// var card = elements.create('card', {
//   iconStyle: 'solid',
//   style: {
//     base: {
//       iconColor: '#8898AA',
//       color: 'black',
//       lineHeight: '36px',
//       fontWeight: 300,
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//       fontSize: '19px',

//       '::placeholder': {
//         color: '#8898AA',
//       },
//     },
//     invalid: {
//       iconColor: '#e85746',
//       color: '#e85746',
//     }
//   },
//   classes: {
//     focus: 'is-focused',
//     empty: 'is-empty',
//   },
// });
// card.mount('#card-element');

var inputs = document.getElementById('payment-form').data-stripe;
console.log('======inputs',inputs)
Array.prototype.forEach.call(inputs, function(input) {
  input.addEventListener('focus', function() {
    input.classList.add('is-focused');
  });
  input.addEventListener('blur', function() {
    input.classList.remove('is-focused');
  });
  input.addEventListener('keyup', function() {
    if (input.value.length === 0) {
      input.classList.add('is-empty');
    } else {
      input.classList.remove('is-empty');
    }
  });
});

function setOutcome(result) {
  var successElement = document.querySelector('.success');
  var errorElement = document.querySelector('.error');
  successElement.classList.remove('visible');
  errorElement.classList.remove('visible');

  if (result.token) {
    // Use the token to create a charge or a customer
    // https://stripe.com/docs/payments/charges-api
    successElement.querySelector('.token').textContent = result.token.id;
    successElement.classList.add('visible');
  } else if (result.error) {
    errorElement.textContent = result.error.message;
    errorElement.classList.add('visible');
  }
}

card.on('change', function(event) {
  setOutcome(event);
});

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = document.querySelector('form');
  var extraDetails = {
    name: form.querySelector('input[name=cardholder-name]').value,
  };
  stripe.createToken(card, extraDetails).then(setOutcome);
});

}