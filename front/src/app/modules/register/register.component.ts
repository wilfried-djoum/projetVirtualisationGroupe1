import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  sendingRequest = false;
  submitting = false;
  photoFile: File | null = null;
  cvFile: File | null = null;


  constructor(private router: Router, private userService: UtilisateurService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.registerForm = this.formBuilder.group({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      dateNaiss: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      codeAuth: new FormControl('', [Validators.required]),
      confirmCodeAuth: new FormControl('', [Validators.required]),
      photo: new FormControl(),
      cv: new FormControl(),
    });
  }
  ngOnInit(): void {

  }

  onPhoto(event: any) {
    this.photoFile = event.target.files[0];
  }
  onCVChange(event: any) {
    this.cvFile = event.target.files[0];
  }

  register(): void {
    this.submitting = true;
    const formData = new FormData();

    if (this.photoFile) {
      formData.append('photo', this.photoFile, this.photoFile.name);
    }
    if (this.cvFile) {
      formData.append('cv', this.cvFile, this.cvFile.name);
    }

    formData.append('nom', this.registerForm.get("nom")?.value);
    formData.append('prenom', this.registerForm.get("prenom")?.value);
    formData.append('numero', this.registerForm.get("numero")?.value);
    formData.append('dateNaiss', this.registerForm.get("dateNaiss")?.value);
    formData.append('email', this.registerForm.get("email")?.value);
    formData.append('codeAuth', this.registerForm.get("codeAuth")?.value);
    formData.append('confirmCodeAuth', this.registerForm.get("confirmCodeAuth")?.value);

    if (this.registerForm.value.codeAuth == this.registerForm.value.confirmCodeAuth) {
      this.userService.register(formData).subscribe(
        response => {
          console.log(formData);
          this.submitting = false
          this.showSuccessMessage("Compte créé avec succès!")
          this.router.navigate(['login'])
        },
        (error: any) => {
          this.submitting = false;
          console.error("E :", error);
          this.showErrorMessage("Erreur de connexion. Veuillez réessayer plus tard.");
        }
      )
    } else {
      this.showErrorMessage("Mots de passe non valide!")
      this.registerForm.value.codeAuth = ""
      this.registerForm.value.confirmCodeAuth = ""
      this.submitting = false
    }

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

  loginForm() {
    this.router.navigate(['login'])
  }
}
