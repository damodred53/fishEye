function displayModal() {
  /* Intégration du formulaire qui apparait dans une modale */

  /* gestion des aria-hidden pour l'accessibilité */
  const ariaRemovedHeader = document.querySelector('.flexbox_profil');
  const ariaRemovedSort = document.querySelector('.sort_picture');
  const ariaRemovedButton = document.querySelector('.sort_button'); 
  /*const ariaRemovedSelection = document.querySelector('.selection'); */
  const ariaRemovedPhotographies = document.querySelector('.photographies');

  const ariaRemovedAside = document.querySelector('.aside_bar');

  ariaRemovedHeader.setAttribute('aria-hidden', 'true');          
  ariaRemovedSort.setAttribute('aria-hidden', "true");
  ariaRemovedPhotographies.setAttribute('aria-hidden', "true");
  ariaRemovedAside.setAttribute('aria-hidden', "true");
  ariaRemovedButton.setAttribute('aria-hidden', "true");


  ariaRemovedHeader.setAttribute('tabindex', '-1');           
  ariaRemovedSort.setAttribute('tabindex', '-1');  
  ariaRemovedPhotographies.setAttribute('tabindex', '-1');  
  ariaRemovedAside.setAttribute('tabindex', '-1');  
  ariaRemovedButton.setAttribute('tabindex', '-1');  


  const crossElement = document.querySelector('.crossElement');
  crossElement.setAttribute('tabindex', '0');
  crossElement.addEventListener('keydown', (e) => closureModalByKeyDown(e));
  crossElement.focus();
    const modal = document.getElementById("contact_modal");

    const modal2 = document.querySelector(".modal");
    modal2.style.display = "block";
    modal.style.display = "block";
    const emptyForm = document.querySelectorAll('.text-control');

    emptyForm.forEach((elem) => {
        elem.value = "";
        elem.setAttribute('tabindex', '0');  
    })
    
    modal2.setAttribute('aria-describedby', 'modal dédiée à l\'envoi d\'un message au photographe');
 



}


function closeModal() {
  /* fonction permettant la fermeture aussi bien du formulaire que du caroussel */
    const modal = document.getElementById("contact_modal");
    const closingCarousel = document.querySelector('.divgalerie');
    const modalForm = document.querySelector(".modal");

    /* gestion des aria-hidden pour l'accessibilité */
    const ariaRemovedHeader = document.querySelector('.flexbox_profil');
    const ariaRemovedSort = document.querySelector('.sort_picture');
    const ariaRemovedPhotographies = document.querySelector('.photographies');
    const ariaRemovedButton = document.querySelector('.sort_button');
    const ariaRemovedSelection = document.querySelector('.sort_button');

    ariaRemovedHeader.setAttribute('aria-hidden', 'false');
    ariaRemovedSort.setAttribute('aria-hidden', 'false');
    ariaRemovedPhotographies.setAttribute('aria-hidden', 'false');
    ariaRemovedButton.setAttribute('aria-hidden', 'false');
    ariaRemovedSelection.setAttribute('aria-hidden', 'false');

    const modal2 = document.querySelector(".modal");
    modal.removeAttribute('role');
    modal.removeAttribute('aria-describedby');
    modal2.removeAttribute('aria-describedby')

  

    if (closingCarousel) {
      closingCarousel.remove();
    } else if (modalForm){
      modalForm.style.display = "none";
    }
    
    modal.style.display = "none";
}

const handleSubmit = (e) => {
    e.preventDefault();

  /* fonction de vérification des champs du formulaire à chaque nouvelle input */
    handleChange();
    /* après validation du formulaire gestion du message contenant le formulaire */
    if (formValidated) {
    const surname = document.querySelector('#first');
    const lastname = document.querySelector('#last');
    const email = document.querySelector('#email');
    const messageContent = document.querySelector('#message');

    console.log(`Voici le contenu du formulaire : le prénom est ${surname.value}, le nom de famille est
    ${lastname.value} l'adresse e-mail est ${email.valuer} et enfin le contenu du message est ${messageContent.value}`)
      /*Fermeture de la modale une fois le formulaire validé */
    closeModal();
    } else {
        throw new Error('Le formulaire est incorrect');
    }
  
}

let formValidated = false;

const handleChange = () => {

/* Vérification des différents champs en fonction de critères, ces critères sont retestés à chaque nouvelle input */

    let validateFirstName = false;
    const controle_firstName = document.querySelector('#first');
    
    if (controle_firstName.value.length < 2) {

      document.querySelector('.firstname_error').style.display = "block";
      document.querySelector('#first').classList.add("text_control_error");
    } else {
      validateFirstName = true;
      document.querySelector('.firstname_error').style.display = "none";
      document.querySelector('#first').classList.remove("text_control_error");
      document.querySelector('#first').setAttribute('aria-invalid', 'false');
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
      document.querySelector('#last').setAttribute('aria-invalid', 'false');
    }
  
    /* Vérification de la validité de l'adresse email */
    const email = document.querySelector('#email');
    const emailToValidate = email.value;
    const emailReg = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i)
    const isEmailValid =  emailReg.test(emailToValidate)
    if (!isEmailValid) {
    document.querySelector('.email_error').style.display = "block";
    document.querySelector('#email').classList.add("text_control_error");
   }  else {
    document.querySelector('.email_error').style.display = "none";
    document.querySelector('#email').classList.remove("text_control_error");
    document.querySelector('#email').setAttribute('aria-invalid', 'false');
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
    document.querySelector('#message').setAttribute('aria-invalid', 'false');
   }
   /* Vérification finale permettant de valider ou non le formulaire */
   if (validateFirstName && validateFamilyName && isEmailValid && validatedMessage ) {
     formValidated = true;
  } else {
    return formValidated = false
  }

  return formValidated
    
}
/* fonction s'activant à chaque nouvelle input dans le formulaire et permettant de vérifier la validatié du formulaire */
const ValidateTest = document.querySelectorAll('.text-control');
ValidateTest.forEach((elem) => {
    elem.addEventListener('keyup', handleChange);
})


const closureModalByKeyDown = (e) => {

  const modal = document.getElementById("contact_modal");
  if(modal) {       
    const keyCode = e.key;
      if (modal.style.display === 'block' && keyCode == 'Escape' || keyCode == 'Enter') {
        closeModal();
      }
  }
}



