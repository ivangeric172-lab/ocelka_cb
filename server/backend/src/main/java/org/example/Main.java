package org.example;

public class Main {
    static void main() {
        Vyrobok nohaNaStol = new Vyrobok(1234L, "N273-4", "Noha na stol", 5L, Dostupnost.NA_OBJEDNAVKU, Material.OCEL_1_4301);
        Vyrobok nohaNaStolicku = new Vyrobok(5678L, "N942-02", "Noha na stolicku", 2405L, Dostupnost.NA_SKLADE, Material.OCEL_1_4404);
        Vyrobok nohaNaDaco = new Vyrobok(null, "N942-02", "Noha na stolicku", null, Dostupnost.NA_SKLADE, Material.OCEL_1_4301);

        Katalog vyrobky = new Katalog();

        vyrobky.pridaj(nohaNaStol);
        vyrobky.pridaj(nohaNaStolicku);
        try {
            vyrobky.pridaj(nohaNaDaco);
        }catch(IllegalArgumentException e){
            IO.println(e.getMessage());
        }
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
        IO.println(nohaNaStolicku.getMaterial().getMarkovanie());
        IO.println(nohaNaStol.getMaterial().getMarkovanie());
        IO.println(nohaNaDaco.getMaterial().getMarkovanie());
        IO.println(nohaNaStol.showId());
        IO.println(nohaNaStolicku.showId());
        IO.println(nohaNaDaco.showId());

        IO.println(vyrobky.pocet());
    }
}
