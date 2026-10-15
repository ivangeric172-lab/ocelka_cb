package org.example;

public enum Dostupnost {
    NA_SKLADE("Na sklade"),
    NA_OBJEDNAVKU("Na objednavku"),
    NIE_JE("Nie je");

    private final String popis;

    private Dostupnost(String popis) {
        this.popis = popis;
    }

    public String getPopis() {
        return popis;
    }
}