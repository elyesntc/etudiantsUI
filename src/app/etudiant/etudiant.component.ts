import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
export class Etudiant {
  constructor(
    public id: number,
    public prenom: string,
    public nom: string,
    public departement: string,
    public email: string
  ) {
  }
}
@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  etudiants: Etudiant[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;
  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
) {
  }

  ngOnInit(): void {
    this.getEtudiants();
    this.editForm = this.fb.group({
    id: [''],
    prenom: [''],
    nom: [''],
    departement: [''],
    email: ['']
  } );
  }
  // tslint:disable-next-line:typedef
  getEtudiants(){
    this.httpClient.get<any>('http://localhost:9001/Etudiants').subscribe(
      response => {
        console.log(response);
        this.etudiants = response;
      }
    );
  }
  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // tslint:disable-next-line:typedef
  onSubmit(f: NgForm) {
    const url = 'http://localhost:9001/Etudiants/ajouter';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); // reload the table
      });
    this.modalService.dismissAll(); // dismiss the modal
  }
  // tslint:disable-next-line:typedef
  openDetails(targetModal, etudiant: Etudiant) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('prenomm').setAttribute('value', etudiant.prenom);
    document.getElementById('nomm').setAttribute('value', etudiant.nom);
    document.getElementById('departementt').setAttribute('value', etudiant.departement);
    document.getElementById('emaill').setAttribute('value', etudiant.email);
  }
  // tslint:disable-next-line:typedef
  openEdit(targetModal, etudiant: Etudiant) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: etudiant.id,
      prenom: etudiant.prenom,
      nom: etudiant.nom,
      departement: etudiant.departement,
      email: etudiant.email
    });
   }
  // tslint:disable-next-line:typedef
  onSave() {
    const editURL = 'http://localhost:9001/Etudiants/' + this.editForm.value.id + '/editer';
    console.log(this.editForm.value);
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
  // tslint:disable-next-line:typedef
  openDelete(targetModal, etudiant: Etudiant) {
    this.deleteId = etudiant.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  // tslint:disable-next-line:typedef
  onDelete() {
    const deleteURL = 'http://localhost:9001/Etudiants/' + this.deleteId + '/supprimer';
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
}
