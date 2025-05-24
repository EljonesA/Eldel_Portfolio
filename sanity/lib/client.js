import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: 'skr9kUWjFOrF1KhGLvfXe2prZuS1p4dnPSFyyyc0iIAOOxL9ucuak9t1dCH16uyELgl4TyJRyrS7P0XHXKeDKdzmuQMLnqmPQbRVufMoKy8Jq2HgXKBrGPIbVUHBCfTvgC1bUBDPrsLSPVCSla7k8GjXChmpaXx29tpKBuOVSqaQ0twvXLRd',
})

export async function getUnits(term) {
  return client.fetch(`*[_type == "unit" && term == $term]{
    code,
    name,
    description,
    grade,
    status,
    term
  }`, { term })
}

export async function createUnit(unit) {
  return client.create({
    _type: 'unit',
    ...unit
  })
}
