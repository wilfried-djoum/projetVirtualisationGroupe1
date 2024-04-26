import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitting = false
  loginForm = this.formBuilder.group({
    numero: new FormControl('', [Validators.required]),
    codeAuth: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private utilisateurService: UtilisateurService, private formBuilder: FormBuilder, private toastr: ToastrService) { }
  ngOnInit(): void {

  }

  login(): void {
    this.submitting = true;
    this.utilisateurService.login(
      this.loginForm.value.numero,
      this.loginForm.value.codeAuth
    ).subscribe((data: any) => {
      this.submitting = false
      console.log("voici les données");
      console.log(data);

      if (data.rows.length != 0) {
        localStorage.setItem('numero', JSON.stringify(data));
        this.showSuccessMessage("Vous êtes connectés");
        this.router.navigate(['accueil']);
      } else {
        this.showErrorMessage("Vérifiez vos informations");
        this.loginForm.reset()
      }

      // localStorage.setItem('numero', JSON.stringify(data))
      // this.showSuccessMessage("Vous êtes connectés");
      // this.router.navigate(['accueil'])
    },
      (error: any) => {
        this.submitting = false;
        console.error("Erreur lors de l'inscription :", error);
        this.showErrorMessage("Impossible. Veuillez réessayer plus tard.");
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      })
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

  formInscription() {
    this.router.navigate(['register'])
  }

  forget() {
    this.router.navigate(['forgotPassword'])
  }
}
