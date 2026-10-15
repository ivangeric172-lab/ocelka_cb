package org.example;

public class Main {
    static void main() {
        Vyrobok nohaNaStol = new Vyrobok(1234, "N273-4", "Noha na stol", 5L, Dostupnost.NA_OBJEDNAVKU);
        Vyrobok nohaNaStolicku = new Vyrobok(5678, "N942-02", "Noha na stolicku", 2405L, Dostupnost.NA_SKLADE);
        Vyrobok nohaNaDaco = new Vyrobok(56478, "N942-02", "Noha na stolicku", null, Dostupnost.NA_SKLADE);
        IO.println(nohaNaStol.getKod());
        IO.println(nohaNaStol.showPrice());
        IO.println(nohaNaStol.getDostupnost().getPopis());
        IO.println(nohaNaStol.getId());
        IO.println(nohaNaStol.getNazov());
        IO.println(nohaNaStolicku.getKod());
        IO.println(nohaNaStolicku.showPrice());
        IO.println(nohaNaStolicku.getDostupnost().getPopis());
        IO.println(nohaNaStolicku.getId());
        IO.println(nohaNaStolicku.getNazov());
        IO.println(nohaNaDaco.showPrice());
        IO.println(nohaNaDaco.getDostupnost().getPopis());
    }
}
