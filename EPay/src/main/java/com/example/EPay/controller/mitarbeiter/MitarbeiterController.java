package com.example.EPay.controller.mitarbeiter;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/mitarbeiter")
public class MitarbeiterController {
    // @Autowired
    // private MitarbeiterService mitarbeiterService;

    // @GetMapping()
    // public ResponseEntity<List<Mitarbeiter>> getKunden() {
    //     //
    //     List<Mitarbeiter> mitarbeiterListe = mitarbeiterService.getAllMitarbeiter();
    //     if (!mitarbeiterListe.isEmpty()) {
    //         return new ResponseEntity<>(mitarbeiterListe, HttpStatus.OK);
    //     }
    //     return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    // }

    // @GetMapping("/{id}")
    // public ResponseEntity<Mitarbeiter> getKundeById(@PathVariable Long id) {
    //     Optional<Mitarbeiter> mitarbeiter = mitarbeiterService.getMitarbeiterById(id);
    //     if (mitarbeiter.isPresent()) {
    //         return new ResponseEntity<>(mitarbeiter.get(), HttpStatus.OK);
    //     }
    //     return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // }

    // @PostMapping("/addMitarbeiter")
    // public ResponseEntity<Mitarbeiter> AddKunde(@RequestBody Mitarbeiter mitarbeiter) {
    //     Mitarbeiter createMitarbeiter = mitarbeiterService.addMitarbeiter(mitarbeiter);
    //     if (createMitarbeiter != null) {
    //         return new ResponseEntity<>(createMitarbeiter, HttpStatus.CREATED);
    //     }
    //     return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    // }

    // @PostMapping("/updateMitarbeiterById/{id}")
    // public ResponseEntity<Mitarbeiter> UpdateKunde(@PathVariable Long id, @RequestBody Mitarbeiter newMitarbeiterData) {
    //     Mitarbeiter updateMitarbeiter = mitarbeiterService.updateMitarbeiterById(id, newMitarbeiterData);
    //     if (updateMitarbeiter != null) {
    //         return new ResponseEntity<>(updateMitarbeiter, HttpStatus.OK);
    //     }
    //     return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // }
}
