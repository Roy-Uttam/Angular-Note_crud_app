import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../interfaces/note';
import { NoteService } from '../../services/note.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css',
})
export class NoteFormComponent implements OnInit,OnChanges {
  noteForm!: FormGroup;
  @Input() selectedNote!: Note;

  isEdit!: boolean;

  constructor(
    private noteService: NoteService,
    private formBuilder: FormBuilder
  ) {
    this.noteService.getEditable().subscribe({
      next: (response) => (this.isEdit = response),
    });
  }

  ngOnChanges(changes:SimpleChanges):void{

    if(changes['selectedNote']?.currentValue){
      const value = changes['selectedNote']?.currentValue;

      this.noteForm.patchValue({
        id:value.id,
        title:value.title,
        content:value.content,
      });
    }
  }

  ngOnInit(): void {
    // console.log('first');
    this.noteForm = this.formBuilder.group({
      id: new Date().getTime(),
      title: ['', Validators.required],
      content: [''],
    });
  }

  onSubmit(): void {
    if (this.noteForm.invalid) {
      return;
    }
    const note: Note = this.noteForm.value;

    if(this.isEdit){
      this.noteService.updateNote(note);
      this.noteService.setEditable(false);

    }else{
      this.noteService.createNote(note);

    }
    

    this.noteForm.reset();
  }
}
