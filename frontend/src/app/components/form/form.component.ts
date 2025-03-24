import { Component, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product.product';
import { CommonModule } from '@angular/common';
import { AddProductsService } from '../../services/add-products.service';
import { ProductsComponent } from '../products/products.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  file: File | undefined;
  naikForm: FormGroup; //lo creamos, tipamos pero no le damos ningun valor
  name: String = '';
  length: number = 0;
  constructor(private productService: AddProductsService, private http: HttpClient) {//se coloca en el () para inyectar las dependencias en la construccion del componenente
    this.naikForm = new FormGroup({//en este momento si lo estamos creando como un grupo de formControls
      id: new FormControl('', [Validators.required,Validators.maxLength(10), this.idUnica.bind(this), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]),//debere cambiar este validador para que no permita valores repetidos
      name: new FormControl('', [Validators.required,Validators.maxLength(10), this.nombreUnico.bind(this)]),
      price: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]),
      stock: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]),
      description: new FormControl('',Validators.maxLength(500)),
      productTypes_id: new FormControl('', Validators.required),
      onSale: new FormControl(false),
      discount: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(95)]),
      imageUrl: new FormControl('', Validators.required)
    });

  }
  saveData() {

    if (this.naikForm.valid) {
      //creamos la imagen
      let customFileName: string;
      if (this.file) {
        const formData = new FormData();
        customFileName = `${this.name}${this.file.name.substring(this.file.name.lastIndexOf('.'))}`;//le llamo como el nombre del producto.extension de la imagen
        formData.append('imagen', this.file, customFileName);
        this.http.post('http://localhost:3000/upload', formData).subscribe(//chatgpt
          (response) => console.log('Imagen subida con éxito:', response),
          (error) => console.error('Error al subir la imagen:', error)
        );
        //hemos subido la imagen al servidor de imágenes
        
        //subimos los datos a la base de datos
        const newProduct: Product = this.naikForm.value;
        newProduct.imageUrl = 'http://localhost:3000/' + customFileName;
        this.http.post("http://localhost:2700/products",newProduct).subscribe(
          (response) =>{
            console.log('Producto registrado con éxito:', response);
          }, 
          (error) =>{
            console.error('Error al registrar el producto:', error);
          }
        );

        this.productService.addProduct(newProduct);
        // Reiniciar el formulario después de guardar
        this.naikForm.reset({ oferta: false, descuento: 0 });

      }
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];


  }
  onChangeName(event: Event): void { //chatgpt
    const inputElement = event.target as HTMLInputElement;
    this.name = inputElement.value;
  }
  //validadores
  /*   idUnica1(campo: FormControl) {
      if (campo.value === 'Rojo') { return { colorErroneo: true }; }
      else { return null; }
    } */


  idUnica(control: AbstractControl): { [key: string]: boolean } | null {
    const productos = this.productService.getProducts();
    if (productos() !== undefined) {
      for (let producto of productos()) {
        if (control.value === producto.id) {
          return { coincidencia: true };  // Se encontró un ID duplicado
        }
      }
    }
    return null;  // No hay coincidencias, el ID es válido
  }

  
  nombreUnico(control: AbstractControl): { [key: string]: boolean } | null { //chatgpt

    const productos = this.productService.getProducts();
    if (productos() != undefined) {
      for (let producto of productos()) {
        if (control.value === producto.name) {
          return { coincidencia: true }; // Return an error if the ID is duplicated
        }
      }
    }

    return null; // Return null if no duplicate is found
  }
 



}
