import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Note } from './interfaces/note';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    NoteFormComponent,
    NoteListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

  selectedNote! : Note;

  selectNote(note:Note){
    this.selectedNote = note;

  }
}
