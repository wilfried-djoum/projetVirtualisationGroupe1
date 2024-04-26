import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  userData: any;

  constructor(private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('numero');
    if (userData) {
      this.userData = JSON.parse(userData);
      console.log(this.userData.rows[0]);

    } else {
      // Gérer le cas où les données de l'utilisateur ne sont pas disponibles
    }
  }

  getImageUser(filename: string): string {
    return `http://localhost:3100/ressources/${filename}`;
  }

  getUrlCV(filename: string): string {
    return `http://localhost:3100/ressources/${filename}`;
  }

  logout(): void {
    localStorage.removeItem('numero')
    this.showErrorMessage("Au revoir !")

    this.router.navigate(['login'])
  }

  showErrorMessage(msg: string) {
    this.toast.warning('', msg, {
      timeOut: 2000,
      progressBar: true,
      positionClass: 'toast-top-right',
    });
  }
}
