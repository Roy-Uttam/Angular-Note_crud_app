import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Note } from '../interfaces/note';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes :Note[]=[];

  private noteSubject = new BehaviorSubject<Note[]>([]);

  constructor() { }

  getNotesObservable(): Observable<Note[]>{
    return this.noteSubject.asObservable();
  }

  createNote(note:Note):void{

    note.id = new Date().getTime();
    this.notes.push(note);
    this.noteSubject.next(this.notes);

  } 
  deleteNote(id:Number):void{

    this.notes = this.notes.filter(note=>note.id !==id);

    this.noteSubject.next(this.notes);

  }




}
