package org.example;

import java.util.List;
import java.util.ArrayList;


public class Katalog {

    private final List<Vyrobok> vyrobky = new ArrayList<>();
    public void pridaj(Vyrobok vyrobok){
        if(vyrobok == null){
            throw new IllegalArgumentException("Nespravny vyrobok");
        }
        for(Vyrobok existujuci : vyrobky){
            if(existujuci.getKod().equals(vyrobok.getKod())){
                throw new IllegalArgumentException("Vyrobok s kodom " + existujuci.getKod() + " uz existuje");
            }
        }
        vyrobky.add(vyrobok);
    }

    public int pocet(){
        return vyrobky.size();
    }
}
