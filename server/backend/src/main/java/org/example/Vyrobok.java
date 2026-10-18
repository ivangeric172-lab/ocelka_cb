package org.example;

public class Vyrobok {

    private final Long id;
    private final String kod;
    private final String nazov;
    private final Long cena;
    private final Dostupnost dostupnost;
    private final Material material;

    public Vyrobok(Long id, String kod, String nazov, Long cena, Dostupnost dostupnost, Material material) {
        if (id != null && id <= 0) {
            throw new IllegalArgumentException("ID musi byt kladne");
        }
        if (kod == null || kod.isBlank()) {
            throw new IllegalArgumentException("Kod nesmie byt prazdny");
        }
        if (nazov == null || nazov.isBlank()) {
            throw new IllegalArgumentException("Nazov je zly");
        }
        if (cena != null && cena < 0) {
            throw new IllegalArgumentException("Cena nesmie byt zaporna");
        }
        if (dostupnost == null) {
            throw new IllegalArgumentException("Dostupnost je zla");
        }
        if (material == null) {
            throw new IllegalArgumentException("Material nesmie byt prazdny");
        }

        this.id = id;
        this.kod = kod;
        this.nazov = nazov;
        this.cena = cena;
        this.dostupnost = dostupnost;
        this.material = material;
    }

    public Long getId() {
        return id;
    }

    public String getKod() {
        return kod;
    }

    public String getNazov() {
        return nazov;
    }

    public Long getCena() {
        return cena;
    }

    public Dostupnost getDostupnost() {
        return dostupnost;
    }

    public Material getMaterial() {
        return material;
    }

    public String showPrice() {
        if (cena == null) {
            return "Cena dohodou";
        } else {
            return String.format("%d,%02d €", cena / 100, cena % 100);
        }
    }

    public String showId() {
        if (id == null) {
            return "ID este nie je nastavene";
        }else{
            return String.format("%d", id);
        }
    }
}
