export default interface RepositoryInterface<T> {
    
    create(entity: T): Promise<void>;
    update(id: string): Promise<void>;
    find(id: string): Promise<T>;
    findAll(): Promise<T[]>;
}