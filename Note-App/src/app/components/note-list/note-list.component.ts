import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Note } from '../../interfaces/note';
import { NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  @Output() selectedNote = new EventEmitter<Note>();

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotesObservable().subscribe((note: Note[]) => {
      this.notes = note;
    });
  }

  //Edit Note
  editNote(note: Note): void {
    this.selectedNote.emit(note);
    this.noteService.setEditable(true);
  }

  //Delete Note
  deleteNote(id: Number): void {
    this.noteService.deleteNote(id);
  }
}
