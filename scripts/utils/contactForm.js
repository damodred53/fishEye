function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    const emptyForm = document.querySelectorAll('.text-control');
    emptyForm.forEach((elem) => {
        elem.value = "";
    })
    

}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const emptyForm = document.querySelectorAll('.text-control');
    emptyForm.forEach((elem) => {
        elem.value = "";
    })
    modal.style.display = "none";
}

const handleSubmit = (e) => {
    e.preventDefault();


    handleChange();
    if (formValidated) {
        const surname = document.querySelector('#first');
    const lastname = document.querySelector('#last');
    const email = document.querySelector('#email');
    const messageContent = document.querySelector('#message');

    console.log(`Voici le contenu du formulaire : le prénom est ${surname.value}, le nom de famille est
    ${lastname.value} l'adresse e-mail est ${email.valuer} et enfin le contenu du message est ${messageContent.value}`)

    closeModal();
    } else {
        throw new Error('Le formulaire est incorrect');
    }




    
}

let formValidated = false;

const handleChange = () => {



    let validateFirstName = false;
    const controle_firstName = document.querySelector('#first');
    if (controle_firstName.value.length < 2) {

      document.querySelector('.firstname_error').style.display = "block";
      document.querySelector('#first').classList.add("text_control_error");
    } else {
      validateFirstName = true;
      document.querySelector('.firstname_error').style.display = "none";
      document.querySelector('#first').classList.remove("text_control_error");
    }
  
    /* Vérification si le nom de famille contient au moins deux caractères */
    let validateFamilyName = false;
    const controle_lastName = document.querySelector('#last');
    if (controle_lastName.value.length < 2) {
      document.querySelector('.familyname_error').style.display = "block";
      document.querySelector('#last').classList.add("text_control_error");
    } else {
      validateFamilyName = true;
      document.querySelector('.familyname_error').style.display = "none";
      document.querySelector('#last').classList.remove("text_control_error");
    }
  
    /* Vérification de la validité de l'adresse email */
    const email = document.querySelector('#email');
    const emailToValidate = email.value;
    const emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i)
    const isEmailValid =  emailReg.test(emailToValidate)
    if (!isEmailValid) {
    document.querySelector('.email_error').style.display = "block";
    document.querySelector('#email').classList.add("text_control_error");
   }  else {
    document.querySelector('.email_error').style.display = "none";
    document.querySelector('#email').classList.remove("text_control_error");
   }

   /* Vérification du contenu du message */
   const message = document.querySelector('#message');
   let validatedMessage = false;
   if(message.value.length <=1) {
        document.querySelector('.message_error').style.display = "block";
        document.querySelector('#message').classList.add("text_control_error");
   } else {
    validatedMessage = true;
    document.querySelector('.message_error').style.display = "none";
    document.querySelector('#message').classList.remove("text_control_error");
   }

   if (validateFirstName && validateFamilyName && isEmailValid && validatedMessage ) {
    console.log("le formulaire est valide")
     formValidated = true;
  } else {
    console.log("le formulaire est invalide")
    return formValidated = false
  }

  return formValidated
    
}


const ValidateTest = document.querySelectorAll('.text-control');
ValidateTest.forEach((elem) => {
    elem.addEventListener('keyup', handleChange);
})




