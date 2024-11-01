'use server'

import { prisma } from "@/lib/db"
import { nomService, transInter, uvTele } from "@prisma/client"
import { revalidatePath } from "next/cache"

/////////////// COMMISSION //////////////////////////////////

export async function createCommision(formData : FormData){
    await prisma.commissionDuMois.create({
        data:{
            mom_service: formData.get('mom_service') as nomService,
            debit: parseInt(formData.get('debit') as unknown as string, 10),
            montant: parseInt(formData.get('montant') as unknown as string, 10),
            sold: parseInt(formData.get('sold') as unknown as string, 10)
        }
    })
    revalidatePath('/commission')
}

export async function editeCommission(formData : FormData, id: number){
    await prisma.commissionDuMois.update({
        where : {id},
        data: {
            mom_service: formData.get('mom_service') as nomService,
            debit: parseInt(formData.get('debit') as unknown as string, 10),
            montant: parseInt(formData.get('montant') as unknown as string, 10),
            sold: parseInt(formData.get('sold') as unknown as string, 10)
        }
    })
    revalidatePath('/commission')
}

export async function deleteCommision (id: number){
    await prisma.commissionDuMois.delete({where:{id}})
    revalidatePath('/commission')
}

////////////////// CAISSE ////////////////////////

export async function createCaisse(formData : FormData){
    await prisma.caisse.create({
        data:{
            service: formData.get('service') as nomService,
            stock_initial: parseInt(formData.get('stock_initial') as unknown as string, 10), 
            stock_final: parseInt(formData.get('stock_final') as unknown as string, 10),
            montant_total: parseInt(formData.get('montant_total') as unknown as string, 10),
        }
    })
    revalidatePath('/caisse')
}

export async function editeCaisse(formData : FormData, id: number){
    await prisma.caisse.update({
        where : {id},
        data: {
            service: formData.get('service') as nomService,
            stock_initial: parseInt(formData.get('stock_initial') as unknown as string, 10), 
            stock_final: parseInt(formData.get('stock_final') as unknown as string, 10),
            montant_total: parseInt(formData.get('montant_total') as unknown as string, 10),
        }
    })
    revalidatePath('/caisse')
}

export async function deleteCaisse (id: number){
    await prisma.caisse.delete({where:{id}})
    revalidatePath('/caisse')
}

///////////// CLIENT CANAL + //////////////////////////////

export async function createClientCanal(formData : FormData){
    await prisma.clientCanal.create({
        data:{
            nom: formData.get('nom') as string,
            prenom: formData.get('prenom') as string,
            telephone: formData.get('telephone') as string,
            numAbonne: parseInt(formData.get('numAbonne') as unknown as string, 10),
            finAbonn: new Date (formData.get('finAbonn') as unknown as Date)
        }
    })
    revalidatePath('/clientCanal')
}

export async function editeClientCanal(formData : FormData, id: number){
    await prisma.clientCanal.update({
        where : {id},
        data: {
            nom: formData.get('nom') as string,
            prenom: formData.get('prenom') as string,
            telephone: formData.get('telephone') as string,
            numAbonne: parseInt(formData.get('numAbonne') as unknown as string, 10),
            finAbonn: new Date (formData.get('finAbonn') as unknown as Date)
        }
    })
    revalidatePath('/clientCanal')
}

export async function deleteClientCanal(id: number){
    await prisma.clientCanal.delete({where:{id}})
    revalidatePath('/clientCanal')
}

////////////// CREDIT DE L'ENTREPRISE //////////////////

export async function createCreditEntreprise(formData : FormData){
    await prisma.creditEntreprise.create({
        data:{
            nomClient: formData.get('nomClient') as string,
            prenomClient: formData.get('prenom') as string,
            motif: formData.get('motif') as string,
            montant: parseInt (formData.get('montant') as unknown as string),
            montant_paye: parseInt (formData.get('montant_paye') as unknown as string),
            montant_restant: parseInt (formData.get('montant_restant') as unknown as string),
            // solde: parseInt (formData.get('solde') as unknown as string) 
        }
    })
    revalidatePath('/creditEntreprise')
}

export async function editeCreditEntreprise(formData:FormData, id: number) {
    await prisma.creditEntreprise.update({
        where: {id},
        data: {
            nomClient: formData.get('nomClient') as string,
            prenomClient: formData.get('prenom') as string,
            motif: formData.get('telephone') as string,
            montant: parseInt (formData.get('montant') as unknown as string),
            montant_paye: parseInt (formData.get('montant_paye') as unknown as string),
            montant_restant: parseInt (formData.get('montant_restant') as unknown as string),
            // solde: parseInt (formData.get('solde') as unknown as string)   
        }
    })
    revalidatePath('/creditEntreprise')
}

export async function deleteCreditEntreprise(id: number){
    await prisma.creditEntreprise.delete({where:{id}})
    revalidatePath('/creditEntreprise')
}

////////////////////////////// PREPAYEE ///////////////////

export async function createPrepayee(formData : FormData){
    await prisma.prepayee.create({
        data:{
            nom_client: formData.get('nom_client') as string,
            montant_initial: parseInt (formData.get('montant_initial') as unknown as string),
            montant_depense: parseInt( formData.get('montant_depense') as unknown as string),
            montant_restant: parseInt(formData.get('montant_restant') as unknown as string),
        }
    })
    revalidatePath('/prepayee')
}

export async function editePrepayee(formData : FormData, id:number) {
    await prisma.prepayee.update({
        where: {id},
        data: {
            nom_client: formData.get('nom_client') as string,
            montant_initial: parseInt (formData.get('montant_initial') as unknown as string),
            montant_depense: parseInt( formData.get('montant_depense') as unknown as string),
            montant_restant: parseInt(formData.get('montant_restant') as unknown as string),
        }
    })
    revalidatePath('/prepayee')
}

export async function deletePrepayee(id: number){
    await prisma.prepayee.delete({where:{id}})
    revalidatePath('/prepayee')
}

///////////////////// SERVICE ENTREPRISE ////////////////////////

export async function createServiceEntreprise(formData : FormData){
    await prisma.serviceEntreprise.create({
        data:{
            mom_service: formData.get('mom_service') as nomService,
            solde_a_nouveau: parseInt(formData.get('solde_a_nouveau') as unknown as string),
            montant_final : parseInt(formData.get('montant_final ') as unknown as string),
        }
    })
    revalidatePath('/serviceEntreprise')
}

export async function editeServiceEntreprise(formData : FormData, id:number) {
    await prisma.serviceEntreprise.update({
        where: {id},
        data : {
            mom_service: formData.get('mom_service') as nomService,
            solde_a_nouveau: parseInt(formData.get('solde_a_nouveau') as unknown as string),
            montant_final : parseInt(formData.get('montant_final ') as unknown as string),
        }
    })
    revalidatePath('/serviceEntreprise')
}

export async function deleteServiceEntreprise(id:number) {
    await prisma.serviceEntreprise.delete({where:{id}})
    revalidatePath('/serviceEntreprise')
}

///////////////////// TRANSFERT INTERNATIONNAL ///////////////////////////////////

export async function createTransInter(formData : FormData){
    await prisma.transInternation.create({
        data:{
            montant_initial: parseInt (formData.get('montant_initial') as unknown as string),
            nom_service: formData.get('nom_service') as transInter,
            montant_trans: parseInt (formData.get('montant_trans') as unknown as string),
            montant_recus: parseInt (formData.get('montant_recus') as unknown as string),
            date_debut: new Date (formData.get('date_debut') as unknown as Date),
            date_fin : new Date (formData.get('date_fin') as unknown as Date),
            soldes: parseInt (formData.get('soldes') as unknown as string),
            Decouvert: parseInt (formData.get('Decouvert') as unknown as string),
            credit : parseInt (formData.get('credit') as unknown as string),
            debit_caisse: parseInt (formData.get('debit_caisses') as unknown as string),
            debit_BNDA: parseInt (formData.get('debit_BNDA') as unknown as string),
        }
    })
    revalidatePath('/transInter')
}

export async function editeTransInter(formData : FormData, id:number){
    await prisma.transInternation.update({
        where: {id},
        data: {
            montant_initial: parseInt (formData.get('montant_initial') as unknown as string),
            nom_service: formData.get('nom_service') as transInter,
            montant_trans: parseInt (formData.get('montant_trans') as unknown as string),
            montant_recus: parseInt (formData.get('montant_recus') as unknown as string),
            date_debut: new Date (formData.get('date_debut') as unknown as Date),
            date_fin : new Date (formData.get('date_fin') as unknown as Date),
            soldes: parseInt (formData.get('soldes') as unknown as string),
            Decouvert: parseInt (formData.get('Decouvert') as unknown as string),
            credit : parseInt (formData.get('credit ') as unknown as string),
            debit_caisse: parseInt (formData.get('debit_caisses') as unknown as string),
            debit_BNDA: parseInt (formData.get('debit_BNDA') as unknown as string),
        }
    })
    revalidatePath('/transInter')
}

export async function deleteTransInter(id:number){
    await prisma.transInternation.delete({where:{id}})
    revalidatePath('/transInter')
}

/////////////////////// UV Abonnement /////////////////////////////////

export async function createUvAbonne(formData : FormData){
    await prisma.uvAbonnement.create({
        data: {
            produit: formData.get('produit') as uvTele,
            montant: parseInt (formData.get('montant') as unknown as string)
        }
    })
    revalidatePath('/uvAbonnement')
}

export async function editeUvAbonne(formData : FormData, id:number){
    await prisma.uvAbonnement.update({
        where:{id},
        data: {
            produit: formData.get('produit') as uvTele,
            montant: parseInt (formData.get('montant') as unknown as string)
        }
    })
    revalidatePath('/uvAbonnement')
}

export async function deleteUvAbonne(id:number){
    await prisma.uvAbonnement.delete({where:{id}})
    revalidatePath('/uvAbonnement')
}


/////////////////// calcule de la date deux jours en avant ///////////////////

export async function getClientsExpiringSoon() {
    const today = new Date();
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);
  
    return await prisma.clientCanal.findMany({
      where: {
        finAbonn: {
          gte: today,
          lte: twoDaysFromNow,
        },
      },
    });
}