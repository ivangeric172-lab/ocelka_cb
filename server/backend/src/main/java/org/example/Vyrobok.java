package org.example;

public class Vyrobok {

    private final long id;
    private final String kod;
    private final String nazov;
    private final Long cena;
    private final Dostupnost dostupnost;

    public Vyrobok(long id, String kod, String nazov, Long cena, Dostupnost dostupnost) {
        if (id <= 0) {
            throw new IllegalArgumentException("ID je zle");
        }
        if (kod == null || kod.isBlank()) {
            throw new IllegalArgumentException("Kod je zly");
        }
        if (nazov == null || nazov.isBlank()) {
            throw new IllegalArgumentException("Nazov je zly");
        }
        if (cena != null && cena < 0) {
            throw new IllegalArgumentException("Cena je zla");
        }
        if (dostupnost == null) {
            throw new IllegalArgumentException("Dostupnost je zla");
        }

        this.id = id;
        this.kod = kod;
        this.nazov = nazov;
        this.cena = cena;
        this.dostupnost = dostupnost;
    }

    public long getId() {
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

    public String showPrice() {
        if (cena == null) {
            return "Cena dohodou";
        } else {
            return String.format("%d,%02d €", cena / 100, cena % 100);
        }
    }
}
