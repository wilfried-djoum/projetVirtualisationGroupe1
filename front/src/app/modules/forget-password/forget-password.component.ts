import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  hideForm(): void {
    var num1: any = document.querySelector('.avantValider1')
    var num2: any = document.querySelector('.avantValider2')
    var champPassw1: any = document.querySelector('.validerUpdate1')
    var champPassw2: any = document.querySelector('.validerUpdate2')

    champPassw1.style.display = 'block'
    champPassw2.style.display = 'block'
    num1.style.display = 'none'
    num2.style.display = 'none'
  }

  // resetForm: FormGroup
  numero: any
  submitting = false
  resetForm = this.formBuilder.group({
    // numero: new FormControl('', [Validators.required]),
    codeAuth: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UtilisateurService, private toastr : ToastrService) {

  }

  formConnexion() {
    this.router.navigate(['login'])
  }

  resetPassword(): void {
    this.submitting = true

    console.log(this.numero);
    console.log(this.resetForm.value.codeAuth);

    const passw = this.resetForm.value.codeAuth
    this.userService.resetPassword(this.numero, passw).subscribe(
      response => {
        this.submitting = false
        console.log(response);
        this.showSuccessMessage('Mot de passe modifié!')
        this.router.navigate(['login'])
      }, (res)=>{

      }
    )
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  showSuccessMessage(msg: string) {
    this.toastr.success('', msg, {
      timeOut: 2000,
      progressBar: true,
      positionClass: 'toast-top-right',
    });
  }

  showErrorMessage(msg: string) {
    this.toastr.error('', msg, {
      timeOut: 2000,
      progressBar: true,
      positionClass: 'toast-top-right',
    });
  }
}
